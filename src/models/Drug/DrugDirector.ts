/* eslint-disable max-len */
import { singleton } from 'tsyringe';
import { DrugBuilder } from './DrugBuilder';
import { Drug } from './Drug.model';

@singleton()
export class DrugDirector {
    private drugBuilder: DrugBuilder;

    constructor() {
      this.drugBuilder = new DrugBuilder();
    }

    public async buildDrugWithMetadata(applicationNumber: string): Promise<Drug> {
      this.drugBuilder.setDrugApplicationNumber(applicationNumber);
      await this.drugBuilder.buildDrugMetadata();
      return this.drugBuilder.getDrug();
    }

    public async buildDrugWithMetadataAndHistoricalSPLMetadata(applicationNumber: string): Promise<Drug> {
      this.drugBuilder.setDrugApplicationNumber(applicationNumber);
      await this.drugBuilder.buildDrugMetadata();
      await this.drugBuilder.buildDrugSPLHistory();
      return this.drugBuilder.getDrug();
    }

    // public async buildDrugWithMetadataAndSPLS(applicationNumber: string): Promise<Drug> {
    //   this.drugBuilder.setDrugApplicationNumber(applicationNumber);
    //   await this.drugBuilder.buildDrugMetadata();
    //   await this.drugBuilder.buildDrugSPLs();
    //   await this.drugBuilder.buildDrugSPLHistory();
    //   return this.drugBuilder.getDrug();
    // }
}
