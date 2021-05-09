// ./src/services/RXImage.service.ts
import axios from 'axios';
import { singleton } from 'tsyringe';
import { RxImage } from './RxImage.interface';

@singleton()
export class RxImageService {
    /**
     * getDrugImagesBySplSetId
     * get a collection of URLs that link to drug images of the drug associate with the label SPL Set ID provided
     * @param splSetId: a valid SPL Set ID associated with a drug and drugs label
     * @returns Promise<RxImage>: an image object form the RxImage API
     */
    getDrugImagesBySplSetId = async (splSetId: string): Promise<RxImage[]> => {
      const response = (await axios.get(`https://rximage.nlm.nih.gov/api/rximage/1/rxnav?setId=${splSetId}`));
      return response.data.nlmRxImages;
    };
}
