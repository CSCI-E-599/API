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

@singleton()
export class DailyMedService {
  getSplBySetId = async (setID: string): Promise<any> => {
    const result = await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${setID}.xml`);
    return result;
  }

  getSplIdsByFdaApplicationID = async (fdaApplicationId: string): Promise<DailyMedSPLMetadata> => {
    const result = await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?application_number=${fdaApplicationId}`);
    return result.data.data;
  }
}
