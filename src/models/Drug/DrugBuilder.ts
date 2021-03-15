/* eslint-disable max-len */
import { container, singleton } from 'tsyringe';
import { OpenFDAService } from '../../services/OpenFDA.service';
import { DailyMedService, DailyMedSplLabelHistory } from '../../services/DailyMed.service';
import { RxImageService } from '../../services/RxImage.service';
import { Drug } from './Drug.model';
import { DrugSplLabelHistory } from './Drug.model.interfaces';

/**
 * DrugBuilderInterface
 * TODO: Add Comments
 */
interface DrugBuilderInterface {
  buildDrugMetadata(): void;
}

/**
 * DrugBuilder singleton class
 * TODO: Add Comments
 */
@singleton()
export class DrugBuilder implements DrugBuilderInterface {
  openFDAService = container.resolve(OpenFDAService);
  dailyMedService = container.resolve(DailyMedService);
  RxImageService = container.resolve(RxImageService);
  drug: Drug = new Drug();

  constructor() {
    this.reset();
  }

  /**
   * reset
   * TODO: Add Comments
   */
  public reset(): void {
    this.drug = new Drug();
  }

  /**
   * setDrugApplicationNumber
   * TODO: Add Comments
   * @param applicationNumber
   */
  public setDrugApplicationNumber(applicationNumber: string): void {
    this.drug.setApplicationNumber(applicationNumber);
  }

  /**
   * buildDrugMetadata
   * TODO: Add Comments
   */
  public async buildDrugMetadata(): Promise<void> {
    const drugMetadata = await this.openFDAService.getDrugByApplicationID(this.drug.getApplicationNumber());
    this.drug.setDrugMetadata(drugMetadata);
  }

  /**
   * buildDrugSPLHistory
   * TODO: Add Comments
   */
  public async buildDrugSPLHistory() {
    const drugSPLSetIds = this.drug.metadata!.splSetId;
    const drugSplHistories: DrugSplLabelHistory[] = [];

    const splHistoryRequests: Promise<void>[] = [];
    for (let x = 0; x < drugSPLSetIds?.length; x++) {
      splHistoryRequests.push(
        this.dailyMedService.getSplHistory(drugSPLSetIds[x])
          .then((history: DailyMedSplLabelHistory) => {
            drugSplHistories.push({
              spl_set_id: history.spl.setid,
              title: history.spl.title,
              history: history.history,
            });
          }),
      );
    }

    await Promise.all(splHistoryRequests);
    this.drug.setDrugSplHistories(drugSplHistories);
  }

  /**
   * buildDrugImages
   * TODO: Add Comments
   */
  public async buildDrugImages() {
    const drugSPLSetIds = this.drug.metadata!.splSetId;
    const drugImages: string[] = [];

    const drugImagesRequests: Promise<any>[] = [];
    for (let x = 0; x < drugSPLSetIds?.length; x++) {
      drugImagesRequests.push(
        this.RxImageService.getDrugImagesBySplSetId(drugSPLSetIds[x])
          .then((imageMetadatas: any) => {
            imageMetadatas.forEach((imageMetadata: any) => {
              drugImages.push(imageMetadata.imageUrl);
            });
          }),
      );
    }

    await Promise.all(drugImagesRequests);
    this.drug.setDrugImages(drugImages);
  }

  /**
   * buildDrugSPLs
   * TODO: Add Comments
   */
  public async buildDrugSPLs(): Promise<void> {
    const drugSpls = await this.openFDAService.getLabelsByApplicationID(this.drug.getApplicationNumber());
    this.drug.setDrugSPLs(drugSpls);
  }

  /**
   * getDrug
   * TODO: Add Comments
   * @returns
   */
  public getDrug(): Drug {
    const result = this.drug;
    this.reset();
    return result;
  }
}
