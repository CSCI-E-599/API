import { container } from 'tsyringe';
import { IOrangeBookDrug } from './OrangeBookDrug.interface';
import { PatentsService } from '../services/patents.service';

export class Drug {
    patentsService = container.resolve(PatentsService);
    orangeBookEntry: IOrangeBookDrug;
    spl: any;
    // usptoPatents: IUSPTOPatent;

    constructor(fdaDrugInformation: IOrangeBookDrug, spl: any) {
      this.orangeBookEntry = fdaDrugInformation;
      this.spl = spl;

      this.orangeBookEntry.patents.forEach((orangeBookPatentEntry) => {
        // console.log(orangeBookPatentEntry.patentNumber);
        this.patentsService.getPatentById(orangeBookPatentEntry.patentNumber.toString());
      });
    }
}
