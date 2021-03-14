/* eslint-disable camelcase */

export interface DrugSPLHistoryEntry {
    spl_version: number;
    published_date: string;
}

export interface DrugSPLHistory {
    spl_set_id: string;
    title: string;
    history: DrugSPLHistoryEntry[];
}