// const mongoClient = mongo.MongoClient;
import * as _ from 'lodash';
import mongo from 'mongodb';
import { singleton } from 'tsyringe';
import { PharmaDBLabelInterface } from './PharmaDBLabel.interface';
import {PharmaDBPatentInterface} from "./PharmaDBPatent.interface";

@singleton()
export class MongoService {
    client: mongo.MongoClient | undefined;
    patentCollection: mongo.Collection | undefined;
    labelCollection: mongo.Collection | undefined;

    uri = 'mongodb+srv://prod:kf8x7eplkDA1ZRbj@cluster0.arbyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    init = async (): Promise<mongo.MongoClient> => {
      this.client = new mongo.MongoClient(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await this.client.connect();
      this.labelCollection = this.client.db('new_bert').collection('labels');
      this.patentCollection = this.client.db('new_bert').collection('patents');
      return this.client;
    }

    getMongo = async (): Promise<mongo.MongoClient> => {
      if (!this.client) {
        return this.init();
      }

      return this.client;
    }

    /**
     * getPatentsByNDANumber
     */
    findLabelsByNDANumber = async (nda: string): Promise<PharmaDBLabelInterface[]> => {
      const labelResults: PharmaDBLabelInterface[] = [];
      const client = await this.getMongo();
      const results = await this.labelCollection?.find({ application_numbers: nda });
      if (!results) { return labelResults; }

      _.forEach(await results.toArray(), (label: PharmaDBLabelInterface) => {
        labelResults.push(label);
      });

      return labelResults;
    }

    getPatentByPatentNumber = async (patentNumber: string): Promise<PharmaDBPatentInterface> => {
      const client = await this.getMongo();
      const result = await this.patentCollection?.findOne({ patent_number: patentNumber });
      return result;
    }
}
