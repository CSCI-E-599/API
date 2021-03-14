/* eslint-disable no-unused-vars */
import { OpenFDADrug } from '../../services/OpenFDADrug.interface';
import { DrugSPLHistory } from './DrugSPLHisotry.interface';

export interface DrugPlan {
    setApplicationNumber(applicationNumber: string): void;
    getApplicationNumber(): string;
    setDrugMetadata(metadata: OpenFDADrug): void;
    setDrugSplHistories(splHistories: DrugSPLHistory[]): void;
    setDrugImages(drugImages: string[]): void;
    setDrugSPLs(spls: any): void;
}
