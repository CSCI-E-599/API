// ./src/services/PharmaDBPatentInterface.ts
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
