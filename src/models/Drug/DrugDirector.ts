/* eslint-disable max-len */
import { singleton } from 'tsyringe';
import { DrugBuilder } from './DrugBuilder';
import { Drug } from './Drug.model';

/**
 * The DrugDirector singleton class is responsible for directing the building of Drug models based on requests
 * it gets from callers. It follows the general principal behind the builder pattern but rather than having one
 * mathod for each variety of Drug model, it has one method that takes a number of flags and directs the
 * construction of the custom Drug model on the fly via the status of the provided flags.
 */
@singleton()
export class DrugDirector {
    private drugBuilder: DrugBuilder;

    constructor() {
      this.drugBuilder = new DrugBuilder();
    }

    /**
     * Construct and return a custom Drug model based on the value of the flags provided. A called must supply,
     * at a minimum, a valid applicationNumber or else the builder will fail to fetch related drud data since
     * the applicationNumber is the drug unique identifier we use against the FDA APIs.
     * @param applicationNumber String: a valid drug application number (FDA Application Number)
     * @param shouldGetSplHistory Boolean: determines whether the builder will attempt fetch and add the SPL Label history metadata to this Drug
     * @param shouldGetCurrentSplLabel Boolean: determines whether the builder will attempt to fetch and add the current SPL Label to this Drug
     * @param shouldGetDrugImages Booelean: determines whether the builder will attempt to fetch and add drug image urls to this drug
     * @param shouldGetDrugLabels Boolean: determines whether the builder will attempt to fetch and add drug labels to this drug
     * @param shouldGetDrugPatents Boolean: determines whether the builder will attempt to fetch and add drug patents to this drug
     * @returns Drug: A built to order ephemeral Drug model to be returned to the API caller, this model is not meant to be persisted anywhere
     */
    public async buildExtensibleDrugWithMetadata(
      applicationNumber: string,
      shouldGetSplHistory: boolean,
      shouldGetCurrentSplLabel: boolean,
      shouldGetDrugImages: boolean,
      shouldGetDrugLabels: boolean,
      shouldGetDrugPatents: boolean,
    ): Promise<Drug> {
      // set the Drug model application number and get the drugs metadata for every new Drug model
      this.drugBuilder.setDrugApplicationNumber(applicationNumber);

      // many other build steps depend on data built by buildDrugMetadata, so this must be executed first and not async
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

      // build drug patents into the new Drug Model if the caller asks for it
      if (shouldGetDrugLabels) {
        await this.drugBuilder.buildDrugLabels();
      }

      // build drug labels into the new Drug Model if the caller asks for it
      if (shouldGetDrugPatents) {
        await this.drugBuilder.buildDrugPatents();
      }

      return this.drugBuilder.getDrug();
    }
}
