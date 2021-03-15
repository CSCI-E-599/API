/* eslint-disable no-unused-vars */
import { OpenFDADrug } from '../../services/OpenFDADrug.interface';
import { DrugSplLabelHistory } from './Drug.model.interfaces';

export interface DrugPlan {
    setApplicationNumber(applicationNumber: string): void;
    getApplicationNumber(): string;
    setDrugMetadata(metadata: OpenFDADrug): void;
    setDrugSplHistories(splHistories: DrugSplLabelHistory[]): void;
    setDrugImages(drugImages: string[]): void;
    setDrugSPLs(spls: any): void;
}
