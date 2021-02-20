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

export interface DrugMetadata {
      applicationNumber: string;
      brandName: string;
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

// export interface DrugSPL {
//     setId: string;
//     publishDate: string;
//     version: number;
//     document: string;
//   }
