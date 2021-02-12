// /src/models/drug.interface.ts

import { IPatent } from "./patent.interface";
import { IExclusivity } from "./exclusivity.interface";


export interface IDrug {
    activeIngredient: string;
    proprietaryName: string;
    dosageFormRouteOfAdministration: string;
    strength: string;
    referenceListedDrug: Boolean;
    referenceStandard: Boolean;
    TECode?: string; // change to enum after extracting all the TE codes
    applicationNumber: string;
    productNumber: number;
    approvalDate: Date;
    applicantHolderFullName: string;
    marketingStatus: string;
    patents: IPatent[];
    exclusivities: IExclusivity[];
}