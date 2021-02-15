// ./src/controllers/drugs.controller.ts
import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { Drug } from '../models/Drug.model';
import { IOrangeBookDrug } from '../models/OrangeBookDrug.interface';
import { OrangeBookService } from '../services/orangeBook.service';
import { NationalDrugCodeService } from '../services/nationalDrugCode.service';
import { DailyMedService } from '../services/dailyMed.service';

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

    public getDrug = async (): Promise<Drug> => {
      const splSetId = (await this.nationalDrugCodeService.getByApplicationID()).openfda.spl_set_id[0];
      console.log(await this.nationalDrugCodeService.getByApplicationID());
      console.log(await this.dailyMedService.getSplIdsByFdaApplicationID('NDA211616'));
      // const rawXmlSpl = await DailyMedService.getSplBySetId(splSetId)
      // console.log(rawXmlSpl);
      const orangeBookEntry: IOrangeBookDrug = await this.orangeBookService.getByApplicationID();
      return new Drug(orangeBookEntry, 'spl filler');
    }
}
