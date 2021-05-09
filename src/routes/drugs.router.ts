// ./src/routes/drugs.router.ts
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DrugsController } from '../controllers/drugs.controller';
import { LruCacheUtility } from '../utilities/lruCache.utility';
import { logger } from '../utilities/logger.utility';

export const drugsRouter = express.Router();
const drugsController = container.resolve(DrugsController);
const lruCacheUtility = container.resolve(LruCacheUtility);

/**
 * GET /drugs
 * Route for searching for a Drug. Provided by a GET all route (that wont actually GET all). Query parameters must be
 * included in order to conduct the search. These query parameters are 'searchQuery' and 'searchType'
 */
drugsRouter.get('/', async (req: Request, res: Response) => {
  const { searchQuery } = req.query;
  const { searchType } = req.query;

  if (!searchQuery || !searchType) {
    res.status(400).send('Missing parameter searchQuery or searchType');
  }

  // try to get the response from the cache first
  let response = lruCacheUtility.get(req.url);
  if (response) {
    logger.info(`Responding with cache entry for url/key: ${req.url}`);
    return res.status(200).send(response);
  }

  try {
    response = await drugsController.findDrug(searchQuery as string, searchType as string);
    lruCacheUtility.set(req.url, response);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

/**
 * GET drugs/:applicationNumber
 * Route for getting a Drug by FDA Application Number (eg NDA022063, or N022063)
 */
drugsRouter.get('/:applicationNumber', async (req: Request, res: Response) => {
  const shouldGetSplHistory = (req.query.splHistory === 'true');
  const shouldGetCurrentSplLabel = (req.query.currentSplLabel === 'true');
  const shouldGetDrugImages = (req.query.images === 'true');
  const shouldGetDrugLabels = (req.query.labels === 'true');
  const shouldGerDrugPatents = (req.query.patents === 'true');

  // try to get the response from the cache first
  let response = lruCacheUtility.get(req.url);
  if (response) {
    logger.info(`Responding with cache entry for url/key: ${req.url}`);
    return res.status(200).send(response);
  }

  try {
    response = await drugsController.getDrugByApplicationNumber(
      req.params.applicationNumber,
      shouldGetSplHistory,
      shouldGetCurrentSplLabel,
      shouldGetDrugImages,
      shouldGetDrugLabels,
      shouldGerDrugPatents,
    );
    lruCacheUtility.set(req.url, response);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
