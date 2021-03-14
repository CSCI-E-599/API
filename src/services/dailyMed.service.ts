/* eslint-disable max-len */
/* eslint-disable camelcase */
// ./src/services/drugs.service.ts
import axios from 'axios';
import { singleton } from 'tsyringe';

export interface DailyMedSplLabel {
  splSetId: string;
  splDocument: string;
}

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

@singleton()
export class DailyMedService {
  getSplBySetId = async (splSetId: string): Promise<DailyMedSplLabel> => {
    const splDocument = (await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${splSetId}.xml`)) as string;
    return { splSetId, splDocument: 'placeholder' };
  }

  getSplHistory = async (splSetId: string): Promise<DailyMedSplLabelHistory> => {
    const splHistory = (await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${splSetId}/history.json`));
    return splHistory.data.data as DailyMedSplLabelHistory;
  }
}
