/* eslint-disable max-len */
import { container, singleton } from 'tsyringe';
import { DrugBuilderInterface } from './DrugBuilder.interface';
import { OpenFDAService } from '../../services/OpenFDA.service';
import { DailyMedService, DailyMedSplLabelHistory } from '../../services/DailyMed.service';
import { RxImageService } from '../../services/RxImage.service';
import { Drug } from './Drug.model';
import { DrugSPLHistory } from './DrugSPLHisotry.interface';

@singleton()
export class DrugBuilder implements DrugBuilderInterface {
    openFDAService = container.resolve(OpenFDAService);
    dailyMedService = container.resolve(DailyMedService);
    RxImageService = container.resolve(RxImageService);
    drug: Drug = new Drug();

    constructor() {
      this.reset();
    }

    public reset(): void {
      this.drug = new Drug();
    }

    public setDrugApplicationNumber(applicationNumber: string): void {
      this.drug.setApplicationNumber(applicationNumber);
    }

    public async buildDrugMetadata(): Promise<void> {
      const drugMetadata = await this.openFDAService.getDrugByApplicationID(this.drug.getApplicationNumber());
      this.drug.setDrugMetadata(drugMetadata);
    }

    public async buildDrugSPLHistory() {
      const drugSPLSetIds = this.drug.metadata!.splSetId;
      const drugSplHistories: DrugSPLHistory[] = [];

      const splHistoryRequests: Promise<DailyMedSplLabelHistory>[] = [];
      for (let x = 0; x < drugSPLSetIds?.length; x++) {
        splHistoryRequests.push(this.dailyMedService.getSplHistory(drugSPLSetIds[x]));
      }

      const histories = await Promise.all(splHistoryRequests);

      histories.forEach((history: DailyMedSplLabelHistory) => {
        drugSplHistories.push({
          spl_set_id: history.spl.setid,
          title: history.spl.title,
          history: history.history,
        });
      });

      this.drug.setDrugSplHistories(drugSplHistories);
    }

    public async buildDrugImages() {
      const drugSPLSetIds = this.drug.metadata!.splSetId;
      const drugImages: string[] = [];

      const drugImagesRequests: Promise<any>[] = [];
      for (let x = 0; x < drugSPLSetIds?.length; x++) {
        drugImagesRequests.push(this.RxImageService.getDrugImagesBySplSetId(drugSPLSetIds[x]));
      }

      const imageSets = await Promise.all(drugImagesRequests);
      imageSets.forEach((imageMetadatas: any) => {
        imageMetadatas.forEach((imageMetadata: any) => {
          drugImages.push(imageMetadata.imageUrl);
        });
      });

      this.drug.setDrugImages(drugImages);
    }

    public async buildDrugSPLs(): Promise<void> {
      const drugSpls = await this.openFDAService.getLabelsByApplicationID(this.drug.getApplicationNumber());
      this.drug.setDrugSPLs(drugSpls);
    }

    public getDrug(): Drug {
      const result = this.drug;
      this.reset();
      return result;
    }
}
