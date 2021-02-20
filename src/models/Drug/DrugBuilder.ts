/* eslint-disable max-len */
import { container, singleton } from 'tsyringe';
import { DrugBuilderInterface } from './DrugBuilder.interface';
import { OpenFDAService } from '../../services/openFDA.service';
import { Drug } from './Drug.model';

@singleton()
export class DrugBuilder implements DrugBuilderInterface {
    openFDAService = container.resolve(OpenFDAService);
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
