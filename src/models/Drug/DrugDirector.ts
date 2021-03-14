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

    public async buildExtensibleDrugWithMetadata(applicationNumber: string, shouldGetSplHistory: boolean, shouldGetCurrentSplLabel: boolean, shouldGetDrugImages: boolean): Promise<Drug> {
      // set the Drug model application number and get the drugs metadata for every new Drug model
      this.drugBuilder.setDrugApplicationNumber(applicationNumber);
      await this.drugBuilder.buildDrugMetadata();

      // build the SPL label History into the new Drug model if the caller asks for it
      if (shouldGetSplHistory) {
        await this.drugBuilder.buildDrugSPLHistory();
      }

      // build the current drug SPL label into the new Drug model if the caller asks for it
      if (shouldGetCurrentSplLabel) {
        await this.drugBuilder.buildDrugSPLs();
      }

      // build drug image urls into the new Drug Model if the caller asks for it
      if (shouldGetDrugImages) {
        await this.drugBuilder.buildDrugImages();
      }

      return this.drugBuilder.getDrug();
    }
}
