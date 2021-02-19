/* eslint-disable max-len */
/* eslint-disable camelcase */
// ./src/services/drugs.service.ts
import axios from 'axios';
import { singleton } from 'tsyringe';

interface DailyMedSPLMetadata {
  spl_version: number;
  published_date: string;
  title: string;
  setid: string;
}

export interface DailyMedSplLabel {
  splSetId: string;
  splDocument: string;
}

@singleton()
export class DailyMedService {
  getSplBySetId = async (splSetId: string): Promise<DailyMedSplLabel> => {
    const splDocument = (await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${splSetId}.xml`)) as string;
    return { splSetId, splDocument: 'placeholder' };
  }

  getSplIdsByFdaApplicationID = async (fdaApplicationId: string): Promise<DailyMedSPLMetadata> => {
    const result = await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?application_number=${fdaApplicationId}`);
    return result.data.data;
  }
}
