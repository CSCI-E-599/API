/* eslint-disable max-len */
import { container, singleton } from 'tsyringe';
import { DrugBuilderInterface } from './DrugBuilder.interface';
import { OpenFDAService } from '../../services/openFDA.service';
import { DailyMedService, DailyMedSplLabelHistory } from '../../services/dailyMed.service';
import { Drug } from './Drug.model';
import { DrugSPLHistory } from './DrugSPLHisotry.interface';

@singleton()
export class DrugBuilder implements DrugBuilderInterface {
    openFDAService = container.resolve(OpenFDAService);
    dailyMedService = container.resolve(DailyMedService);
    drug: Drug = new Drug();

    constructor() {
      this.reset();
    }

    public reset(): void {
      this.drug = new Drug();
    }

    public setDrugApplicationNumber(applicationNumber: string): void {
      this.drug.setApplicationNumber(applicationNumber);
    }

    public async buildDrugMetadata(): Promise<void> {
      const drugMetadata = await this.openFDAService.getDrugByApplicationID(this.drug.getApplicationNumber());
      this.drug.setDrugMetadata(drugMetadata);
    }

    public async buildDrugSPLHistory() {
      const drugSPLSetIds = this.drug.metadata!.splSetId;
      const drugSplHistories: DrugSPLHistory[] = [];

      const splHistoryRequests: Promise<DailyMedSplLabelHistory>[] = [];
      for (let x = 0; x < drugSPLSetIds?.length; x++) {
        splHistoryRequests.push(this.dailyMedService.getSplHistory(drugSPLSetIds[x]));
        // drugSplHistories.push({
        //   spl_set_id: splSetId,
        //   history: splHistory,
        // });
      }

      const histories = await Promise.all(splHistoryRequests);

      histories.forEach((history: DailyMedSplLabelHistory) => {
        drugSplHistories.push({
          spl_set_id: history.spl.setid,
          title: history.spl.title,
          history: history.history,
        });
      });
      // console.log(histories);
      // drugSPLSetIds?.forEach(async (splSetId: string) => {
      //   const splHistory = await this.dailyMedService.getSplHistory(splSetId);
      //   drugSplHistories.push({
      //     spl_set_id: splSetId,
      //     history: splHistory,
      //   });
      // });

      this.drug.setDrugSplHistories(drugSplHistories);
      console.log(this.drug);
    }

    public async buildDrugSPLs(): Promise<void> {
      const drugSpls = await this.openFDAService.getLabelsByApplicationID(this.drug.getApplicationNumber());
      this.drug.setDrugSPLs(drugSpls);
    }

    public getDrug(): Drug {
      const result = this.drug;
      this.reset();
      return result;
    }
}
