import { OpenFDADrug } from '../../services/OpenFDADrug.interface';
import { DrugPlan } from './DrugPlan.interface';
import { DrugMetadata } from './DrugMetadata.interface';
import { DrugSPLHistory } from './DrugSPLHisotry.interface';

export class Drug implements DrugPlan {
    private applicationNumber: string| undefined;
    metadata: DrugMetadata | undefined;
    drugSplHistory: DrugSPLHistory[] | undefined;
    drugImages: string[] | undefined;
    spls: any;

    public setApplicationNumber(applicationNumber: string): void {
      this.applicationNumber = applicationNumber;
    }

    public getApplicationNumber(): string {
      if (!this.applicationNumber) {
        throw new Error('applicationNumber must be defined before building drug model.');
      }
      return this.applicationNumber;
    }

    public setDrugMetadata(metadata: OpenFDADrug): void {
      this.metadata = {
        applicationNumber: metadata.application_number,
        brandName: metadata.openfda.brand_name[0],
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

    public setDrugSplHistories(splHistories: DrugSPLHistory[]) {
      this.drugSplHistory = splHistories;
    }

    public setDrugImages(drugImages: string[]) {
      this.drugImages = drugImages;
    }

    public setDrugSPLs(spls: any): void {
      this.spls = spls;
    }
}
