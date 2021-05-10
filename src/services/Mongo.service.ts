// ./src/services/Mongo.service.ts
import * as _ from 'lodash';
import mongo from 'mongodb';
import { singleton } from 'tsyringe';
import { PharmaDBLabelInterface } from './PharmaDBLabel.interface';
import { PharmaDBPatentInterface } from './PharmaDBPatent.interface';

@singleton()
export class MongoService {
    private client: mongo.MongoClient | undefined;
    private patentCollection: mongo.Collection | undefined;
    private labelCollection: mongo.Collection | undefined;

    uri = 'mongodb://ec2-35-170-81-159.compute-1.amazonaws.com:27017';

    init = async (): Promise<mongo.MongoClient> => {
      this.client = new mongo.MongoClient(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await this.client.connect();
      this.labelCollection = this.client.db('pharmadb').collection('labels');
      this.patentCollection = this.client.db('pharmadb').collection('patents');
      return this.client;
    }

    /**
     * utility function to assure the connection and collection is initialized before any queries
     * are attempted against the collection
     * @returns Promise<mongo.Collection>: the Labels collection object from MongoDB
     */
    private getOrInitLabelCollection = async (): Promise<mongo.Collection> => {
      if (!this.labelCollection) { await this.init(); }
      return this.labelCollection as mongo.Collection;
    }

    /**
     * utility function to assure the connection and collection is initialized before any queries
     * are attempted against the collection
     * @returns Promise<mongo.Collection>: the Patents collection object from MongoDB
     */
    private getOrInitPatentCollection = async (): Promise<mongo.Collection> => {
      if (!this.patentCollection) { await this.init(); }
      return this.patentCollection as mongo.Collection;
    }

    /**
     * Get all of the labels whose application_numbers array contains the provided Drug FDA NDA Number
     * @param nda string: A valid FDA NDA Number for a Drug
     * @returns Promise<PharmaDBLabelInterface[]>: an array of labels related to the provided NDA Number
     */
    findLabelsByNDANumber = async (nda: string): Promise<PharmaDBLabelInterface[]> => {
      const labelResults: PharmaDBLabelInterface[] = [];
      const labelCollection = await this.getOrInitLabelCollection();
      const results = await labelCollection.find({ application_numbers: parseInt(nda.substring(3, 9), 10).toString() });
      if (!results) { return labelResults; }

      _.forEach(await results.toArray(), (label: PharmaDBLabelInterface) => {
        labelResults.push(label);
      });

      return labelResults;
    }

    /**
     * Get a single patent by the provided patent number
     * @param patentNumber string: a valid patent number of a patent stored in the database
     * @returns Promise<PharmaDBPatentInterface>: a single patent whose patent number matches the one provided
     */
    getPatentByPatentNumber = async (patentNumber: string): Promise<PharmaDBPatentInterface> => {
      const patentCollection = await this.getOrInitPatentCollection();
      const result = await patentCollection.findOne({ patent_number: patentNumber });
      return result;
    }
}
