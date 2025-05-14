import { TFunction } from 'i18next';

export const childrenTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_SERIAL'),
  },
  {
    id: 2,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_NAME'),
  },
  {
    id: 3,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_DOB'),
  },
  {
    id: 4,
    name: t('CANDIDATE_PERSONAL_INFO.CHILD_EDUCATIONAL_QUALIFICATION'),
  },
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
