import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';

export const tableClassACols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_A.SERIAL',
    ),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'totalAmount',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_A.TOTAL_AMOUNT',
    ),
  },

  {
    id: 3,
    key: 'position',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_A.LOCATION',
    ),
  },

  {
    id: 4,
    key: 'approximatePrice',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_A.ESTIMATE_PRICE',
    ),
  },
];

export const tableClassBCols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_B.SERIAL',
    ),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'homeTypeAndNo',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_B.TOTAL_AMOUNT',
    ),
  },

  {
    id: 3,
    key: 'position',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_B.LOCATION',
    ),
  },

  {
    id: 4,
    key: 'approximatePrice',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_B.ESTIMATE_PRICE',
    ),
  },
];

export const tableClassCCols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_C.SERIAL',
    ),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'otherAssetsName',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_C.OTHER_ASSETS',
    ),
  },

  {
    id: 3,
    key: 'approximatePrice',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_CLASS_C.ESTIMATE_PRICE',
    ),
  },
];

export const tableCCols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t('CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_C.SERIAL'),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'totalApproximateIncome',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_C.TOTAL_YEARLY_INCOME',
    ),
  },

  {
    id: 3,
    key: 'totalApproximateExpenditure',
    name: t(
      'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_COLS_C.TOTAL_YEARLY_EXPENSE',
    ),
  },
];
