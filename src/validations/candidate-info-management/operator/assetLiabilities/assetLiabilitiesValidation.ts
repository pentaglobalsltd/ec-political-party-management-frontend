import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

export const ASSET_LIABILITIES =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.ASSET_LIABILITIES;

export const assetsExceptHouseValidation = yup.object().shape({
  [ASSET_LIABILITIES.TOTAL_AMOUNT]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.ASSETS_EXCEPT_TOTAL_AMOUNT'),
  [ASSET_LIABILITIES.OTHER_LOCATION]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.ASSETS_EXCEPT_LOCATION'),
  [ASSET_LIABILITIES.OTHER_ESTIMATED_VALUE]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.ASSETS_EXCEPT_ESTIMATED_VALUE'),
});

export const houseAssetValidation = yup.object().shape({
  [ASSET_LIABILITIES.HOUSE_NATURE_AND_NUMBER]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.HOUSE_ASSET_NATURE'),
  [ASSET_LIABILITIES.HOUSE_LOCATION]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.HOUSE_ASSET_LOCATION'),
  [ASSET_LIABILITIES.HOUSE_ESTIMATED_VALUE]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.HOUSE_ASSET_ESTIMATED_VALUE'),
});

export const otherAssetValidation = yup.object().shape({
  [ASSET_LIABILITIES.OTHER_ASSETS]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.OTHER_ASSETS_ASSETS'),
  [ASSET_LIABILITIES.OTHER_ASSETS_ESTIMATED_VALUE]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.OTHER_ASSETS_ESTIMATED_VALUE'),
});

export const yearlyIncomeSpendingValidation = yup.object().shape({
  [ASSET_LIABILITIES.TOTAL_ESTIMATED_ANNUAL_INCOME]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.YEARLY_INCOME_ANNUAL_INCOME'),
  [ASSET_LIABILITIES.TOTAL_ESTIMATED_ANNUAL_COST]: yup.string().nullable(),
  // .required('ASSET_LIABILITIES_ERROR_MSG.YEARLY_INCOME_ANNUAL_COST'),
});

export const assetLiabilitiesValidation = yup.object().shape({
  [ASSET_LIABILITIES.ELECTION_AREA_NAME_NUMBER]: yup
    .string()
    .required(
      'ASSET_LIABILITIES_ERROR_MSG.ASSET_LIABILITY_ELECTION_AREA_NAME_NUMBER',
    ),
  [ASSET_LIABILITIES.CANDIDATE_NAME]: yup
    .string()
    .required('ASSET_LIABILITIES_ERROR_MSG.ASSET_LIABILITY_CANDIDATE_NAME'),
  [ASSET_LIABILITIES.CANDIDATE_ADDRESS]: yup
    .string()
    .required('ASSET_LIABILITIES_ERROR_MSG.ASSET_LIABILITY_CANDIDATE_ADDRESS'),
  assetsExceptHouse: yup.array().of(assetsExceptHouseValidation),
  houseAssets: yup.array().of(houseAssetValidation),
  othersAssets: yup.array().of(otherAssetValidation),
  yearlyIncomesAndExpenditures: yup.array().of(yearlyIncomeSpendingValidation),
});

export type AssetLiabilitiesValidationType = yup.InferType<
  typeof assetLiabilitiesValidation
>;
