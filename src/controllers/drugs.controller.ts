/* eslint-disable max-len */
// ./src/controllers/drugs.controller.ts
import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { Drug } from '../models/Drug/Drug.model';
import { DrugDirector } from '../models/Drug/DrugDirector';
import { OpenFDAService } from '../services/openFDA.service';
import { OpenFDADrug } from '../services/OpenFDADrug.interface';
@singleton()
export class DrugsController {
    private drugDirector: DrugDirector;
    private openFDAService: OpenFDAService;

    constructor(
      drugDirector: DrugDirector,
      openFDAService: OpenFDAService,
    ) {
      this.drugDirector = drugDirector;
      this.openFDAService = openFDAService;
    }

    public findDrug = async (searchQuery: string, searchType: string): Promise<OpenFDADrug[]> => {
      const results = await this.openFDAService.search(searchQuery, searchType);
      return results;
    }

    /**
     * 
     * @param applicationNumber 
     */
    public getDrugByApplicationNumber = async (applicationNumber: string): Promise<Drug> => {
      const drug = await this.drugDirector.buildDrugWithMetadataAndSPLS(applicationNumber);
      return drug;
    };






    /**
     * Search for drug by a single facet, expecting zero to many results from the NDC
     * @param query string: the value being for which a match or partial match is being sought
     * @param field string: the drug parameter scope of the search query
     */
    // public getDrugsBySearch = async (query: string, field: string): Promise<any[]> => {
    //   // const ndcData: INDCEntry[] = (await this.nationalDrugCodeService.search(query, field));
    //   // const drugs = ndcData.map((ndcEntry: INDCEntry) => new Drug(ndcEntry));
    //   // await Promise.all(drugs.map((drug: Drug) => drug.loadSPLHistory()));
    //   // const drugsMetaData = drugs.map((drug: Drug) => drug.getMetadata());
    //   // await this.openFDAService.search(query, field);
    //   return this.openFDAService.search(query, field);
    // }

    // /**
    //  * Get one drug by the drugs official National Drug Code database ID (NDC Code)
    //  * @param ndcCode string: and NDC code of an existing drug
    //  */
    // public getDrugByNDCCode = async (ndcCode: string): Promise<Drug> => {
    //   const ndcData: INDCEntry = (await this.nationalDrugCodeService.search(ndcCode, 'product_ndc'))[0];
    //   console.log(ndcData.openfda.spl_set_id);

    //   // const label: DailyMedSplLabel[] = await ndcData.openfda.spl_set_id.map(async (splSetId: string) => {
    //   //   const x = await this.dailyMedService.getSplBySetId(splSetId);
    //   //   return x;
    //   // });

    //   const drug = new Drug(ndcData);

    //   // console.log(label);
    //   // drug.addSPLDocument(splSetId, 'sdfsd');

    //   // const orangeBookEntry: IOrangeBookDrug = await this.orangeBookService.getByApplicationID();
    //   return drug;
    // }

    // public getDrug = async (): Promise<Drug> => {
    //   const splSetId = (await this.nationalDrugCodeService.searchByApplicationNumber('notvalid'))[0].openfda.spl_set_id[0];
    //   console.log(await this.nationalDrugCodeService.searchByApplicationNumber('notvalid')[0]);
    //   console.log(await this.dailyMedService.getSplIdsByFdaApplicationID('NDA211616'));
    //   // const rawXmlSpl = await DailyMedService.getSplBySetId(splSetId)
    //   // console.log(rawXmlSpl);
    //   const orangeBookEntry: IOrangeBookDrug = await this.orangeBookService.getByApplicationID();
    //   return new Drug(orangeBookEntry, 'spl filler');
    // }
}
