export interface PharmaDBPatentInterface {
    patent_number: string;
    assignee: {
        org_name: string
    }[];
    inventors: {
        first_name: string,
        last_name: string
    }[];
    claims: {
        claim_number: string,
        claim_text: string,
    }[];
    submission_date: string;
    published_date: string;
}
