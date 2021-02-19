// ./src/services/drugs.service.ts
import { IOrangeBookDrug } from '../models/OrangeBookDrug.interface';
import { Drug } from '../models/Drug.model';
// import * as PatentService from './patents.service';

const testDrugs: IOrangeBookDrug[] = [
  {
    activeIngredient: 'BEMPEDOIC ACID',
    proprietaryName: 'NEXLETOL',
    dosageFormRouteOfAdministration: 'TABLET; ORAL',
    strength: '180MG',
    referenceListedDrug: true,
    referenceStandard: true,
    applicationNumber: 'N211616',
    productNumber: 0o01,
    approvalDate: new Date('Feb 21, 2020'),
    applicantHolderFullName: 'ESPERION THERAPEUTICS INC',
    marketingStatus: 'Prescription',
    patents: [
      {
        productNumber: 0o01,
        patentNumber: 7335799,
        patentExpiration: new Date('12/03/2025'),
        drugSubstance: 'DS',
        submissionDate: new Date('03/06/2020'),
      },
      {
        productNumber: 0o01,
        patentNumber: 8497301,
        patentExpiration: new Date('12/23/2023'),
        patentUseCode: 'U-2747',
        submissionDate: new Date('03/06/2020'),
      },
      {
        productNumber: 0o01,
        patentNumber: 9000041,
        patentExpiration: new Date('12/23/2023'),
        patentUseCode: 'U-2747',
        submissionDate: new Date('03/06/2020'),
      },
      {
        productNumber: 0o01,
        patentNumber: 9624152,
        patentExpiration: new Date('12/23/2023'),
        patentUseCode: 'U-2747',
        submissionDate: new Date('03/06/2020'),
      },
      {
        productNumber: 0o01,
        patentNumber: 10118881,
        patentExpiration: new Date('12/23/2023'),
        patentUseCode: 'U-2747',
        submissionDate: new Date('03/06/2020'),
      },
    ],
    exclusivities: [
      {
        productNumber: 0o001,
        exclusivityCode: 'NCE',
        exclusivityExpiration: new Date('02/21/2025'),
      },
    ],
  },
];

/**
 * findAll
 */
// export const findAll = async (): Promise<IDrug[]> => testDrugs;

export const findAll = async (): Promise<Drug[]> => {
  const drugs: Drug[] = [];

  // testDrugs.forEach((orangeBookEntry: IOrangeBookDrug) => {
  //   drugs.push(new Drug(orangeBookEntry, 'nothing'));
  // });

  return drugs;
};

/**
 * findOneByFDAApplicationNumber
 */
