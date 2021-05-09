// ./src/services/DailyMed.service.ts
import axios from 'axios';
import { singleton } from 'tsyringe';
import { DailyMedSplLabelHistory } from './DailyMed.interface';

@singleton()
export class DailyMedService {
  /**
   * Get the SPL label history metadata by providing the SPL Set ID of the series of labels whose data is sought
   * @param splSetId string: a valid SPL Set ID associated with a series ot labels for a drug
   * @returns Promise<DailyMedSplLabelHistory>: SPL Label History metadata from the DailyMed API
   */
  getSplHistory = async (splSetId: string): Promise<DailyMedSplLabelHistory> => {
    const splHistory = (await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${splSetId}/history.json`));
    return splHistory.data.data as DailyMedSplLabelHistory;
  }
}
