import { singleton } from 'tsyringe';
import axios from 'axios';
import { PharmaDBLabelInterface } from './PharmaDBLabel.interface';
import { PharmaDBPatentInterface } from './PharmaDBPatent.interface';

import * as MockLabelResponse from './PharmaDBLabel.mockdata.json';
import * as MockPatentResponse from './PharmaDBPatent.mockdata.json';

@singleton()
export class PharmaDBService {
  getLabelsByNDANumber = async (ndaNumber: string): Promise<PharmaDBLabelInterface[]> => {
    // make request to MongoDB to get the correct set of patents
    await axios.get('https://www.google.com');

    return MockLabelResponse.data;
  }

  getPatentsByNDANumber = async (ndaNumber: string): Promise<PharmaDBPatentInterface[]> => {
    // make request to MongoDB to get the correct set of labels
    await axios.get('https://www.google.com');
    return MockPatentResponse.data;
  }
}
