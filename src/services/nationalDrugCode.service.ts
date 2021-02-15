// ./src/services/drugs.service.ts
import axios from 'axios';
import { IndcEntry } from './ndcEntry.interface';
import { singleton } from 'tsyringe';

@singleton()
export class NationalDrugCodeService {

  /**
   * findOneByFDAApplicationNumber
   */
  public getByApplicationID = async (): Promise<IndcEntry> => {
    const result = await axios.get('https://api.fda.gov/drug/ndc.json?search=application_number:%22NDA211616%22&limit=1');
    return result.data.results[0];
  }
}
