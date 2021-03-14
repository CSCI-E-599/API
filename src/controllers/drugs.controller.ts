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

    /**
     * Find a drugs metadata by providing a search query and a search type.
     * The search types are defined in the openFDA Service anre are brand_name, application_number,
     * generic_name, and manufacturer_name.
     * @param searchQuery String: the value for which a match or partial match is being sought
     * @param searchType String: the drug parameter scope of the search query
     * @returns OpenFDADrug[] a populated or empty array of OpenFDADrug that provide drug metadata
     */
    public findDrug = async (searchQuery: string, searchType: string): Promise<OpenFDADrug[]> => {
      const results = await this.openFDAService.search(searchQuery, searchType);
      return results;
    }

    /**
     * TODO: Add a comment here
     * @param applicationNumber
     */
    public getDrugByApplicationNumber = async (applicationNumber: string): Promise<Drug> => {
      const drug = await this.drugDirector.buildDrugWithMetadataAndHistoricalSPLMetadata(applicationNumber);
      return drug;
    };
}
