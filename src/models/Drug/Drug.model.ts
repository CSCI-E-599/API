import { OpenFDADrug } from '../../services/OpenFDADrug.interface';
import { DrugPlan } from './DrugPlan.interface';
import { DrugMetadata, DrugSplLabelHistory, DrugLabel, DrugPatent } from './Drug.model.interfaces';

/**
 * Drug Model Drug.model.ts
 * This Drug model is responsible for the structure of the custom Drug returned by this API
 * on many of the Drug related calls this API supports. It is part of a builder pattern
 * supported by DrugBuilder.ts, DrugDirector.ts and DrugPlan.interface.ts. As a result, it
 * contains mostly setter methods and interface implementations.
 */

export class Drug implements DrugPlan {
    private applicationNumber: string| undefined;
    metadata: DrugMetadata | undefined;
    drugSplHistory: DrugSplLabelHistory[] | undefined;
    drugImages: string[] | undefined;
    drugLabels: DrugLabel[] | undefined;
    drugPatents: DrugPatent[] | undefined;

    // TODO: remove or rename the SPLs construct
    spls: any;

    /**
     * Set the application number of the Drug, this has to be done for all Drugs before
     * data can be populated by the DrugBuilder.ts since all data is fetched from FDA
     * APIs based on the Drugs FDA Application Number.
     *
     * @param applicationNumber String: A valid drug FDA Application Number
     */
    public setApplicationNumber(applicationNumber: string): void {
      this.applicationNumber = applicationNumber;
    }

    /**
     * Get the application number of the Drug
     * @returns String: applicationNumber param of this Drug if one exists, otherwise throw Error
     */
    public getApplicationNumber(): string {
      if (!this.applicationNumber) {
        throw new Error('applicationNumber must be defined before building drug model.');
      }
      return this.applicationNumber;
    }

    /**
     * Load metadata into the Drug model based on the OpenFDADrug interface. The OpenFDADrug
     * interface is based on an Open FDA API response body and so should facilitate easy
     * movement of data from a OpenFDA API response to the metadata of a Drug object.
     * @param metadata OpenFDADrug: drug inforamtion object fetched from the OpenFDA Drug DB API
     */
    public setDrugMetadata(metadata: OpenFDADrug): void {
      this.metadata = {
        applicationNumber: metadata.application_number,
        brandNames: metadata.openfda.brand_name,
        genericName: metadata.openfda.generic_name[0],
        manufacturerName: metadata.openfda.manufacturer_name[0],
        productNdc: metadata.openfda.product_ndc,
        productType: metadata.openfda.product_type[0],
        substanceName: metadata.openfda.substance_name,
        splId: metadata.openfda.spl_id[0],
        splSetId: metadata.openfda.spl_set_id,
        packageNdc: metadata.openfda.package_ndc,
      };
    }

    /**
     * Load drug SPL metadata history into the Drug model based on the DrugSplLabelHistory
     * interface. The DrugSPLLabelHistory interface is based on an DailyMed response body
     * and so should facilitate easy movement of data from a DailyMed API response to
     * splHistories parameter of a Drug object.
     * @param splHistories DrugSPLLabelHistory[]: Array of historical drug label metadata objects
     * where each item in the array represents a drug label set (by the industry standard SPL
     * Set Id)
     */
    public setDrugSplHistories(splHistories: DrugSplLabelHistory[]) {
      this.drugSplHistory = splHistories;
    }

    /**
     * Load drug image URLs into the Drug model. Drug image urls are simple strings in an array
     * where the string is a full URL path to an image of the drug. This method is mean to be
     * used to load images into the Drug model from RxImage.service.ts
     * @param drugImages String[]: Array of URL paths to images of the Drug
     */
    public setDrugImages(drugImages: string[]) {
      this.drugImages = drugImages;
    }

    /**
     * Load drug SPL object into the Drug model. The Drug SPL object is a large and somewhat
     * dynamically typed object that may or may not contain all the paramters available via
     * the SPL (Structure Product Language) standard used by the FDA.
     * @param spls: any: An SPL label object where the different params represent parsed out
     * sections of the drugs label
     */
    public setDrugSPLs(spls: any): void {
      this.spls = spls;
    }

    /**
     * TODO: Add Comment
     * @param labels
     */
    public setDrugLabels(labels: DrugLabel[]): void {
      this.drugLabels = labels;
    }

    /**
     * TODO: Add Comment
     * @param patents
     */
    public setDrugPatents(patents: DrugPatent[]): void {
      this.drugPatents = patents;
    }
}
