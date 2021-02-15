/* eslint-disable import/prefer-default-export */
// ./src/routes/drugs.router.ts
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import * as DrugsService from '../services/drugs.service';
import { IOrangeBookDrug } from '../models/OrangeBookDrug.interface';
import { Drug } from '../models/Drug.model';
import { container } from 'tsyringe';
import { DrugsController } from '../controllers/drugs.controller';

export const drugsRouter = express.Router();

const drugsController = container.resolve(DrugsController);

// GET drugs/
drugsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const drug = await drugsController.getDrug();

    res.status(200).send(drug);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// GET drugs/:FDAApplicationId

// GET drugs/:FDAApplicationId/patents
