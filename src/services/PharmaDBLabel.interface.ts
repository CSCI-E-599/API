export interface PharmaDBLabelInterface {
    application_numbers: string[];
    setid: string;
    spl_id: string;
    spl_version: string;
    sections: {
        name: string;
        text: string;
        scores: {
            patent_number: string;
            claim_id: string;
            score: number;
        }[];
    }
    published_date: string;
}

// TODO: add an enum of the section names for the labels
