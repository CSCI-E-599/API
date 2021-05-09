export interface PharmaDBLabelInterfaceAddition {
    indices?: number[],
    'expanded_context': string,
    'scores':
        {
            'patent_number': string,
            'claim_number': number,
            'parent_claim_numbers': number[]
            'score': number
        }[]
}

export interface PharmaDBLabelInterface {
    '_id': {
        '$oid': string
    },
    'application_numbers': string[],
    'set_id': string,
    'spl_id': string,
    'spl_version': string,
    'published_date': string,
    'sections': {
        'name': string,
        'text': string,
        'parent': string | null
    }[],
    'previous_label_published_date': string | null,
    'previous_label_spl_id': string | null,
    'previous_label_spl_version': string | null,
    'next_label_published_date': string | null,
    'next_label_spl_id': string | null,
    'next_label_spl_version': string | null,
    'diff_against_previous_label': {
        'name': string,
        'text': any[][],
        'parent': string | null,
        additions?: PharmaDBLabelInterfaceAddition[] | undefined
    }[],
    additions?: any
}
