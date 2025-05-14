import { TFunction } from 'i18next';

export const genderRadioOptions = (t: TFunction<'translation', undefined>) => [
  {
    id: 'male',
    label: t('CANDIDATE_PERSONAL_INFO.MALE'),
    value: 'MALE',
  },
  {
    id: 'female',
    label: t('CANDIDATE_PERSONAL_INFO.FEMALE'),
    value: 'FEMALE',
  },
  {
    id: 'thirdGender',
    label: t('CANDIDATE_PERSONAL_INFO.THIRD_GENDER'),
    value: 'NEUTRAL',
  },
];

export const maritalStatusRadioOptions = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 'unmarried',
    label: t('CANDIDATE_PERSONAL_INFO.UNMARRIED'),
    value: 'SINGLE',
  },
  {
    id: 'married',
    label: t('CANDIDATE_PERSONAL_INFO.MARRIED'),
    value: 'MARRIED',
  },
  {
    id: 'widowed',
    label: t('CANDIDATE_PERSONAL_INFO.WIDOWED'),
    value: 'WIDOW',
  },
  {
    id: 'divorced',
    label: t('CANDIDATE_PERSONAL_INFO.DIVORCED'),
    value: 'DIVORCED',
  },
];

const getDateOfBirthColumn = (t: TFunction<'translation', undefined>) => {
  return {
    id: 4,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_DOB'),
  };
};

export const childrenTableColumns = ({
  t,
  isUpazilaElection,
}: {
  t: TFunction<'translation', undefined>;
  isUpazilaElection?: boolean;
}) => [
  {
    id: 1,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_SERIAL'),
  },
  {
    id: 2,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_NAME'),
  },

  ...(isUpazilaElection ? [getDateOfBirthColumn(t)] : []),

  {
    id: 3,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_EDUCATIONAL_QUALIFICATION'),
  },

  ...(!isUpazilaElection ? [getDateOfBirthColumn(t)] : []),

  {
    id: 5,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_INSTITUTE_ADDRESS'),
  },
  {
    id: 6,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_MARITAL_STATUS'),
  },
  {
    id: 7,
    name: '',
  },
];

export const maritalStatusSelectOptions = (
  t: TFunction<'translation', undefined>,
) => [
  {
    label: t('CANDIDATE_PERSONAL_INFO.UNMARRIED'),
    value: 'SINGLE',
  },
  {
    label: t('CANDIDATE_PERSONAL_INFO.MARRIED'),
    value: 'MARRIED',
  },
  {
    label: t('CANDIDATE_PERSONAL_INFO.WIDOWED'),
    value: 'WIDOWER',
  },
  {
    label: t('CANDIDATE_PERSONAL_INFO.DIVORCED'),
    value: 'DIVORCED',
  },
];
