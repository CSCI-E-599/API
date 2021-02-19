/* eslint-disable camelcase */
export interface INDCEntry {
    product_ndc: string;
    generic_name: string;
    labeler_name: string;
    brand_name: string;
    active_ingredients: any[];
    finished: boolean;
    packaging: any[];
    listing_expiration_date: string;
    openfda: {
        manufacturer_name: string[];
        rxcui: string[];
        spl_set_id: string[];
        is_original_packager: boolean[];
        upc: string[];
        unii: string[];
    };
    marketing_category: string;
    dosage_form: string;
    spl_id: string;
    product_type: string;
    route: any[];
    marketing_start_date: string;
    product_id: string;
    application_number: string;
    brand_name_base: string;
}
