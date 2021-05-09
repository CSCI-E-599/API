// ./src/services/DailyMed.interface.ts
export interface DailyMedSplLabelHistory {
    spl: {
        title: string;
        setid: string;
    };
    history: {
        spl_version: number;
        published_date: string;
    }[];
}
