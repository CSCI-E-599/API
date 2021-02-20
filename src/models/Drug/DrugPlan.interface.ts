/* eslint-disable no-unused-vars */
import { OpenFDADrug } from '../../services/OpenFDADrug.interface';

export interface DrugPlan {
    setDrugMetadata(metadata: OpenFDADrug): void;
}
