// /src/models/drug.interface.ts
export interface IOrangeBookDrug {
    activeIngredient: string;
    proprietaryName: string;
    dosageFormRouteOfAdministration: string;
    strength: string;
    referenceListedDrug: Boolean;
    referenceStandard: Boolean;
    TECode?: string; // change to enum after extracting all the TE codes
    applicationNumber: string;
    productNumber: number;
    approvalDate: Date;
    applicantHolderFullName: string;
    marketingStatus: string;
    patents: {
        productNumber: number;
        patentNumber: number;
        patentExpiration: any;
        drugSubstance?: string;
        drugProduct?: string;
        patentUseCode?: string;
        delistRequested?: boolean;
        submissionDate: Date;
    }[];
    exclusivities: {
        productNumber: number;
        exclusivityCode: string;
        exclusivityExpiration: Date;
    }[];
}
