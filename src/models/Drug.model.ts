import { container } from 'tsyringe';
// import { IOrangeBookDrug } from './OrangeBookDrug.interface';
import { PatentsService } from '../services/patents.service';
import { INDCEntry } from '../services/ndcEntry.interface';

// drug metadata includes only drug data provided by the NDC
export interface DrugMetadata {
    ndc: string;
    genericName: string;
    manufacturer: string;
    brandName: string;
    applicationNumber: string;
    marketingStartDate: string;
    activeIngredients: { name: string; strength: string}[];
}

export interface DrugSPL {
  setId: string;
  document: string;
}
export class Drug {
    patentsService = container.resolve(PatentsService);
    metadata: DrugMetadata;
    // orangeBookEntry: IOrangeBookDrug;
    spls: DrugSPL[];

    constructor(ndcEntry :INDCEntry) {
      this.metadata = {
        ndc: ndcEntry.product_ndc,
        genericName: ndcEntry.generic_name,
        manufacturer: ndcEntry.labeler_name,
        brandName: ndcEntry.brand_name,
        applicationNumber: ndcEntry.application_number,
        marketingStartDate: ndcEntry.marketing_start_date,
        activeIngredients: ndcEntry.active_ingredients,
      };

      this.spls = [];
      this.patents = [];
    }

    public getMetadata(): DrugMetadata {
      return this.metadata;
    }
}
