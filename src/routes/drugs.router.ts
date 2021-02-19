/* eslint-disable import/prefer-default-export */
// ./src/routes/drugs.router.ts
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DrugsController } from '../controllers/drugs.controller';

export const drugsRouter = express.Router();

const drugsController = container.resolve(DrugsController);


// GET drugs/?search={searchValue}&field={searchField}
drugsRouter.get('/', async (req: Request, res: Response) => {

  if (!(req.query.search && req.query.field)) {
    res.status(400).send('Request must include search and field query parameters');
  }

  try {
    const drugs = await drugsController.getDrugsBySearch(req.query.search as string, req.query.field as string);
    // console.log(drug);
    res.status(200).send(drugs);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


// GET drugs/
drugsRouter.get('/:ndcCode', async (req: Request, res: Response) => {
  try {
    const drug = await drugsController.getDrugByNDCCode(req.params.ndcCode);
    console.log(drug);
    res.status(200).send(drug);
  } catch (error) {
    res.status(404).send(error.message);
  }
});



/**
 * GET drugs/:FDAApplicationID
 * Get a data by using the drugs FDA Application ID
 */
// drugsRouter.get('/', async (req: Request, res: Response) => {
//   try {
//     const drug = await drugsController.getDrug();

//     res.status(200).send(drug);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });


// GET drugs/:FDAApplicationId/patents
