/* eslint-disable max-len */
import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { Drug } from '../models/Drug/Drug.model';
import { DrugDirector } from '../models/Drug/DrugDirector';
import { OpenFDAService } from '../services/OpenFDA.service';
import { OpenFDADrug } from '../services/OpenFDADrug.interface';

/**
 * Drugs Controller drugs.controller.ts
 * This controller class is reponsible for organizing all the requests that come from routes
 * beginning with /drugs. This primarily inlcudes the drugs search path and the get drug by
 * FDA Application number path.
 */

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
     * Find drugs by providing a search query and a search type. This will return a drug entry
     * similar in structure to whats provided by the Open FDA search API. It does not return a
     * JSON structure that adheres to this APIs Drug model and should be used primarily for
     * finding a drugs FDA Application Number (NDA Number)
     *
     * @param searchQuery String: the value for which a match or partial match is being sought
     * @param searchType String: param on which the search will be conducted (brand_name,
     * application_nmber, generic_name, or manufacturer_name)
     * @returns OpenFDADrug[] a populated or empty array of OpenFDADrugs
     */
    public findDrug = async (searchQuery: string, searchType: string): Promise<OpenFDADrug[]> => {
      const results = await this.openFDAService.search(searchQuery, searchType);
      return results;
    }

    /**
     * Get a Drugs data by the Drugs FDA Application Number. This will return, at a minimum the Drug
     * model populated with the Drugs metadata. Boolean arguments are required to determine what
     * additional data will be fetched and added to the Drug model return to the caller.
     * @param applicationNumber String: FDA Application Number belonging to a drug in the Open FDA API/DB
     * @param shouldGetSplHistory Boolean: Determines whether SPL History metadata will be fetched and added to the resp
     * @param shouldGetCurrentSplLabel Boolean: Determines whether the drugs current SPL Label will be fetched and added to the resp
     * @param shouldGetDrugImages Boolean: Determines whether the drugs image urls will be fetched and added to the resp
     * @param shouldGetDrugLabels Boolean: Determines whether the drugs labels will be fetched and added to the resp
     * @param shouldGetDrugPatents Boolean: Determines whether the drugs patents will be fetched and added to the resp
     * @returns Drug: A purpose built Drug model containing Drug metadata and a variety of ther params based on req options
     */
    public getDrugByApplicationNumber = async (
      applicationNumber: string,
      shouldGetSplHistory: boolean,
      shouldGetCurrentSplLabel: boolean,
      shouldGetDrugImages: boolean,
      shouldGetDrugLabels: boolean,
      shouldGetDrugPatents: boolean,
    ): Promise<Drug> => {
      const drug = await this.drugDirector.buildExtensibleDrugWithMetadata(
        applicationNumber,
        shouldGetSplHistory,
        shouldGetCurrentSplLabel,
        shouldGetDrugImages,
        shouldGetDrugLabels,
        shouldGetDrugPatents,
      );
      return drug;
    };
}
