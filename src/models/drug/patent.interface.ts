// /src/models/patent.interface.ts

export interface IPatent {
    productNumber: number;
    patentNumber: number;
    patentExpiration: any;
    drugSubstance?: string;
    drugProduct?: string;
    patentUseCode?: string;
    delistRequested?: boolean;
    submissionDate: Date;
}
