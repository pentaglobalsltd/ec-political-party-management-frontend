import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const numericalReporting2TableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('NUMERICAL_REPORTING_2.NUMERICAL_REPORTING_2'),
  },
];

export const numericalReporting2TableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('NUMERICAL_REPORTING_2.PARTY'),
    key: 'party',
  },
  {
    id: 2,
    name: t('NUMERICAL_REPORTING_2.APPLIED_CANDIDATE'),
    key: 'appliedCandidate',
  },
  {
    id: 3,
    name: t('NUMERICAL_REPORTING_2.CANCELED_CANDIDATE'),
    key: 'cancelesCandidate',
  },
  {
    id: 4,
    name: t('NUMERICAL_REPORTING_2.WITHDRAWN_CANDIDATE'),
    key: 'withdrawnCandidate',
  },
  {
    id: 5,
    name: t('NUMERICAL_REPORTING_2.FINAL_CANDIDATE'),
    key: 'finalCandidate',
  },
  {
    id: 6,
    name: t('NUMERICAL_REPORTING_2.STEPS'),
    key: 'procedure',
  },
];

export const options = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];
