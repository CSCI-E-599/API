/* eslint-disable import/prefer-default-export */
// ./src/routes/drugs.router.ts
import express, { Request, Response } from 'express';
import * as DrugsService from '../services/drugs.service';
import { IDrug } from '../models/drug/drug.interface';

export const drugsRouter = express.Router();

// GET drugs/
drugsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const drugs: IDrug[] = await DrugsService.findAll();

    res.status(200).send(drugs);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// GET drugs/:FDAApplicationId
