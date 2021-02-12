// ./src/services/drugs.service.ts
import { IDrug } from "../models/drug.interface";
import { IDrugs } from "../models/drugs.interface";

const testDrugs: IDrugs = {
    1: {
        uuid: 23423,
        fdaApplicationNumber: "sdfsdf"
    },
    2: {
        uuid: 23234423,
        fdaApplicationNumber: "sdfssddsfdf"
    },
};

export const findAll = async (): Promise<IDrugs> => {
    return testDrugs;
};