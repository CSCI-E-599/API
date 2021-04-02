/* eslint-disable max-len */
import { container, singleton } from 'tsyringe';
import { OpenFDAService } from '../../services/OpenFDA.service';
import { DailyMedService, DailyMedSplLabelHistory } from '../../services/DailyMed.service';
import { RxImageService } from '../../services/RxImage.service';
import { Drug } from './Drug.model';
import { DrugSplLabelHistory } from './Drug.model.interfaces';

/**
 * DrugBuilderInterface
 * This interface specs out the DrugBuilderInterface class and behaves as the
 * contract between the class in this file and its consumers
 */
interface DrugBuilderInterface {
  buildDrugMetadata(): void;
}

/**
 * The DrugBuilder singleton class is responsible for dynamically creating a Drug model. API callers
 * might require different pieces of drug data depending on their use case. In order to increase
 * efficicnecy, this class will create the custom Drug model the requester/caller needs on the fly in
 * an effort to avoid making HTTP or cache requests (through other services) it otherwise wouldn't have
 * to. However, all Drug models retuned will at least include DrugMetadata.
 */
@singleton()
export class DrugBuilder implements DrugBuilderInterface {
  openFDAService = container.resolve(OpenFDAService);
  dailyMedService = container.resolve(DailyMedService);
  RxImageService = container.resolve(RxImageService);

  // the custom ephemeral Drug model currently being built in memory
  drug: Drug = new Drug();

  constructor() {
    // reset the builder to prepare it for the next build
    this.reset();
  }

  /**
   * Reset the builder by removing the previously built Drug so that it's able to build another Drug
   * for the next caller
   */
  public reset(): void {
    this.drug = new Drug();
  }

  /**
   * Set the Application Number on the Drug thats currently being built in memory. This param is
   * necessary to have loaded before any more building is done since the applicationNumber
   * (aka FDA Application Number) is the identifier we use to fetch drug data from other APIs
   * TODO: Add Comments
   * @param applicationNumber String: a valid FDA Application Number (eg NDA123123)
   */
  public setDrugApplicationNumber(applicationNumber: string): void {
    this.drug.setApplicationNumber(applicationNumber);
  }

  /**
   * Build the Drug model metadata by fetching the drug metadata from the from the FDA API via
   * the openFDAService then setting the appropriate parameters on the Drug model using the
   * Drug metadata setter
   */
  public async buildDrugMetadata(): Promise<void> {
    const drugMetadata = await this.openFDAService.getDrugByApplicationID(this.drug.getApplicationNumber());
    this.drug.setDrugMetadata(drugMetadata);
  }

  /**
   * Build the Drugs SPL label history by iterating through all the SPL Set IDs in the Drugs
   * metadata. Each SPL Set ID has its own label history, so for each Set ID a request is made
   * to the DailyMed API via the dailyMedService in order to fetch that Set IDs SPL history.
   * For set of SPL Set ID history, push it into an array thats then set as the Drug models
   * drugSplHistories.
   * REQUIRES THE DRUG METADATA TO HAVE ALREADY BEEN BUILT
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
   * Build the Drugs image links by iterating through all the SPL Set IDs in the Drugs
   * metadata. Each SPL Set ID could have its own images (and some may have no images),
   * so for each Set ID a request is made to the rxImages API via the RsImageService in
   * order to fetch that Set IDs set of image urls. Add all the image URLs to one array.
   * This is not a essentail feature so the image URLs are not scoped to invidiaul arrays
   * based on SPL Set ID but can be at a later date with a small refactor.
   * REQUIRES THE DRUG METADATA TO HAVE ALREADY BEEN BUILT
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
   * TODO: Add Comments / potentially remove this one
   */
  public async buildDrugSPLs(): Promise<void> {
    const drugSpls = await this.openFDAService.getLabelsByApplicationID(this.drug.getApplicationNumber());
    this.drug.setDrugSPLs(drugSpls);
  }

  // TODO: finish function
  public async buildDrugLabels(): Promise<void> {
    // get drug labels from mongo
    // set the drugs labels param accordingly
    this.drug.setDrugLabels([]);
  }

  // TODO: finish function
  public async buildDrugPatents(): Promise<void> {
    // get the drug patents from mongo
    // set the drugs patents param accordingly
    this.drug.setDrugPatents([]);
  }
  /**
   * Get the Drug model thats currently being build in memory. This should be done to fetch the Drug model
   * after the DrugDirector has completed directing how the Drug model should be built. Once the Drug is
   * gotten, this.reset is called in order to clear the DrugBuilders current in memory Drug model that way
   * it's ready to build the next one
   * @returns Drug: the Drug model currently being built in memory
   */
  public getDrug(): Drug {
    const result = this.drug;
    this.reset();
    return result;
  }
}
