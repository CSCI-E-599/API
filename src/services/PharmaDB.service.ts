// ./src/services/PharmaDB.service.ts
import * as _ from 'lodash';
import { singleton } from 'tsyringe';
import { PharmaDBLabelInterface } from './PharmaDBLabel.interface';
import { PharmaDBPatentInterface } from './PharmaDBPatent.interface';
import { MongoService } from './Mongo.service';

@singleton()
export class PharmaDBService {
  /**
   * getLabelsByNDANumber
   * Get all of a Drugs labels by first providing the Drug FDA NDA Number
   * @param ndaNumber string: a valid FDA NDA Number associated with a drug
   * @returns PharmaDBLabelInterface[]: a collection of labels associated with the Drug whose NDA was provided
   */
  getLabelsByNDANumber = async (ndaNumber: string): Promise<PharmaDBLabelInterface[]> => {
    const mongoService = new MongoService();
    return mongoService.findLabelsByNDANumber(ndaNumber);
  }

  /**
   * getPatentsByNDANumber
   * Get all of the patents related to a Drug by first providing the Drugs FDA NDA Number
   * @param ndaNumber string: a valid FDA NDA Number associated with a drug
   * @returns PharmaDBPatentInterface[]: a collection of patents associated with the Drug whose NDA was provided
   */
  getPatentsByNDANumber = async (ndaNumber: string): Promise<PharmaDBPatentInterface[]> => {
    const mongoService = new MongoService();
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
