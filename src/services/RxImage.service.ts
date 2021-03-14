// ./src/services/drugs.service.ts
import axios from 'axios';
import { singleton } from 'tsyringe';

@singleton()
export class RxImageService {
    getDrugImagesBySplSetId = async (splSetId: string): Promise<any> => {
      const response = (await axios.get(`https://rximage.nlm.nih.gov/api/rximage/1/rxnav?setId=${splSetId}`));
      return response.data.nlmRxImages;
    };
}
