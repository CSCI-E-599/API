import * as _ from 'lodash';
import {container, singleton} from 'tsyringe';
import axios from 'axios';
import { PharmaDBLabelInterface } from './PharmaDBLabel.interface';
import { PharmaDBPatentInterface } from './PharmaDBPatent.interface';
import { MongoService } from './Mongo.service';

import * as MockLabelResponse from './PharmaDBLabel.mockdata.json';
import * as MockPatentResponse from './PharmaDBPatent.mockdata.json';

@singleton()
export class PharmaDBService {
  // private mongoService: MongoService;

  getLabelsByNDANumber = async (ndaNumber: string): Promise<PharmaDBLabelInterface[]> => {
    const mongoService = new MongoService();
    return mongoService.findLabelsByNDANumber(ndaNumber);
  }

  getPatentsByNDANumber = async (ndaNumber: string): Promise<PharmaDBPatentInterface[]> => {
    const mongoService = new MongoService();
    // make request to MongoDB to get the correct set of labels
    // await axios.get('https://www.google.com');
    const labels = await mongoService.findLabelsByNDANumber(ndaNumber);
    const patentNumbers: string[] = [];

    labels.forEach((label: PharmaDBLabelInterface) => {
      for (const addition in label.additions) {
        label.additions[addition].scores.forEach((score: any) => {
          patentNumbers.push(score.patent_number);
        });
      }
    });

    const patents = await Promise.all(_.map(_.uniq(patentNumbers), (patentNumber: string) => mongoService.getPatentByPatentNumber(patentNumber)));

    return patents;
  }
}
