export interface PharmaDBPatentInterface {
    '_id': {
        '$oid': string
    },
    'patent_number': string,
    'expiration_date': string,
    'claims': {
        'claim_number': number,
        'claim_text': string,
        'dependencies': string | null
    }[]
}

// export interface PharmaDBPatentInterface {
//     patent_number: string;
//     assignee?: {
//         org_name: string;
//     }[];
//     inventors?: {
//         first_name: string;
//         last_name: string;
//     }[];
//     claims: {
//         claim_number: number;
//         claim_text: string;
//         dependencies: string | null;
//     }[];
//     submission_date?: string;
//     published_date: string;
//     expiration_date: string;
// }
