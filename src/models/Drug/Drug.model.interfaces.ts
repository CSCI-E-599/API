/* eslint-disable camelcase */
/**
 * Drug.model.interfaces.ts
 */

export interface DrugMetadata {
    applicationNumber: string;
    brandNames: string[];
    genericName: string;
    manufacturerName: string;
    productNdc: string[];
    productType: string;
    substanceName: string[];
    splId: string;
    splSetId: string[];
    packageNdc: string[];
   // products: Product[];
   // submissions: Submission[];
    // splHistory: DrugSPL[];
}

export interface DrugSplLabelHistoryEntry {
    spl_version: number;
    published_date: string;
}

export interface DrugSplLabelHistory {
    spl_set_id: string;
    title: string;
    history: DrugSplLabelHistoryEntry[];
}

export interface DrugLabel {
    [key: string]: any;
}

export interface DrugPatent {
    [key: string]: any;
}

// export interface Product {
//     productNumber: string;
//     referenceDrug: string;
//     brandName: string;
//     activeIngredients: {
//       name: string;
//       strength: string;
//     }[];
//     referenceStandard: string;
//     dosageForm: string;
//     route: string;
//     marketingStatus: string;
//   }

// export interface Submission {
//     submissionType: string;
//     submissionNumber: string;
//     submisionStatus: string;
//     submissionStatusDate: string;
//     reviewPriority: string;
//     submissionClassCode: string;
//     submissionClassCodeDescription: string;
//   }

// export interface DrugSPL {
//     setId: string;
//     publishDate: string;
//     version: number;
//     document: string;
//   }
