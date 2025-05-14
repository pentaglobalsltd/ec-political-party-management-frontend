import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const candidateTypeTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_TYPE.CANDIDATE_TYPE'),
  },
];

export const candidateTypeTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CANDIDATE_TYPE.ID'),
    key: 'id',
  },
  {
    id: 2,
    name: t('CANDIDATE_TYPE.CANDIDATE_TYPE_BANGLA'),
    key: 'nameBn',
  },
  {
    id: 3,
    name: t('CANDIDATE_TYPE.CANDIDATE_TYPE_ENGLISH'),
    key: 'nameEn',
  },
  {
    id: 4,
    name: t('CANDIDATE_TYPE.ELECTION_TYPE'),
    key: 'electionTypeNameBn',
  },
];

export const candidateTypeTableRows = [
  {
    id: 1,
    districtBn: '',
    districtEn: '',
    districtGoCode: '',
  },
];
