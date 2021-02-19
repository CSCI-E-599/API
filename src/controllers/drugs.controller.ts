/* eslint-disable max-len */
// ./src/controllers/drugs.controller.ts
import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { Drug, DrugMetadata } from '../models/Drug.model';
import { IOrangeBookDrug } from '../models/OrangeBookDrug.interface';
import { OrangeBookService } from '../services/orangeBook.service';
import { NationalDrugCodeService } from '../services/nationalDrugCode.service';
import { DailyMedService, DailyMedSplLabel } from '../services/dailyMed.service';
import { INDCEntry } from '../services/ndcEntry.interface';

@singleton()
export class DrugsController {
    private dailyMedService: DailyMedService;
    private nationalDrugCodeService: NationalDrugCodeService;
    private orangeBookService: OrangeBookService;

    constructor(
      dailyMedService: DailyMedService,
      nationalDrugCodeService: NationalDrugCodeService,
      orangeBookService: OrangeBookService,
    ) {
      this.dailyMedService = dailyMedService;
      this.nationalDrugCodeService = nationalDrugCodeService;
      this.orangeBookService = orangeBookService;
    }

    /**
     * Search for drug by a single facet, expecting zero to many results from the NDC
     * @param query string: the value being for which a match or partial match is being sought
     * @param field string: the drug parameter scope of the search query
     */
    public getDrugsBySearch = async (query: string, field: string): Promise<DrugMetadata[]> => {
      const ndcData: INDCEntry[] = (await this.nationalDrugCodeService.search(query, field));
      const drugs = ndcData.map((ndcEntry: INDCEntry) => new Drug(ndcEntry));
      const drugsMetaData = drugs.map((drug: Drug) => drug.getMetadata());
      return drugsMetaData;
    }

    /**
     * Get one drug by the drugs official National Drug Code database ID (NDC Code)
     * @param ndcCode string: and NDC code of an existing drug
     */
    public getDrugByNDCCode = async (ndcCode: string): Promise<Drug> => {
      const ndcData: INDCEntry = (await this.nationalDrugCodeService.search(ndcCode, 'product_ndc'))[0];
      console.log(ndcData.openfda.spl_set_id);

      // const label: DailyMedSplLabel[] = await ndcData.openfda.spl_set_id.map(async (splSetId: string) => {
      //   const x = await this.dailyMedService.getSplBySetId(splSetId);
      //   return x;
      // });

      const drug = new Drug(ndcData);

      // console.log(label);
      // drug.addSPLDocument(splSetId, 'sdfsd');

      // const orangeBookEntry: IOrangeBookDrug = await this.orangeBookService.getByApplicationID();
      return drug;
    }

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
