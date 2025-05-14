import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';
import { ELECTION_INFO } from '@constants/election-info';

export const TableACols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_A.SERIAL'),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'approximateAmount',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_A.AMOUNT'),
  },

  {
    id: 3,
    key: 'incomeSource',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_A.SOURCE'),
  },
];

export const TableBCols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_B.SERIAL'),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'approximateAmount',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_B.AMOUNT'),
  },

  {
    id: 3,
    key: 'relativeName',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_B.RELATIVE_NAME',
    ),
  },

  {
    id: 4,
    key: 'relativeAddress',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_B.RELATIVE_ADDRESS',
    ),
  },

  {
    id: 5,
    key: 'relation',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_B.RELATIVE_RELATION',
    ),
  },

  {
    id: 6,
    key: 'relativeIncomeSource',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_B.RELATIVE_INCOME_SOURCE',
    ),
  },
];

export const TableCCols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_C.SERIAL'),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'approximateAmount',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_C.AMOUNT'),
  },

  {
    id: 3,
    key: 'relativeName',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_C.RELATIVE_NAME',
    ),
  },

  {
    id: 4,
    key: 'relativeAddress',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_C.RELATIVE_ADDRESS',
    ),
  },

  {
    id: 5,
    key: 'relation',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_C.RELATIVE_RELATION',
    ),
  },

  {
    id: 6,
    key: 'relativeIncomeSource',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_C.RELATIVE_INCOME_SOURCE',
    ),
  },
];

export const TableDCols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_D.SERIAL'),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'approximateAmount',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_D.AMOUNT'),
  },

  {
    id: 3,
    key: 'personOrInstitutionName',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_D.NAME'),
  },

  {
    id: 4,
    key: 'personOrInstitutionAddress',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_D.ADDRESS'),
  },
];

export const TableECols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_E.SERIAL'),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'approximateAmount',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_E.AMOUNT'),
  },

  {
    id: 3,
    key: 'personOrInstitutionName',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_E.NAME'),
  },

  {
    id: 4,
    key: 'personOrInstitutionAddress',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_E.ADDRESS'),
  },
];

export const TableFCols = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    key: 'idx',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_F.SERIAL'),
    render: (data: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },

  {
    id: 2,
    key: 'approximateAmount',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_F.AMOUNT'),
  },

  {
    id: 3,
    key: 'personOrInstitutionName',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_F.NAME'),
  },

  {
    id: 4,
    key: 'personOrInstitutionAddress',
    name: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_F.ADDRESS'),
  },
  {
    id: 5,
    key: 'incomeSource',
    name: t(
      'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_COLS_F.INCOME_SOURCE',
    ),
  },
];

export const renderComponents = (electionTypeId: string | number) => {
  switch (Number(electionTypeId)) {
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return true;
    case ELECTION_INFO.MUNICIPALITY.ID:
      return true;
    case ELECTION_INFO.UNION_PARISHAD.ID:
      return true;
    default:
      return false;
  }
};
