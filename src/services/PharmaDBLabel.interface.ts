export interface PharmaDBLabelInterface {
    application_numbers: string[];
    set_id: string;
    spl_id: string;
    spl_version: string;
    sections: {
        name: string;
        text: string;
        scores?: {
            patentNumber: string;
            claimNumber: number;
            parentClaimNumbers: number[];
            score: number;
        }[];
    }[];
    published_date: string;
}

// TODO: add an enum of the section names for the labels
