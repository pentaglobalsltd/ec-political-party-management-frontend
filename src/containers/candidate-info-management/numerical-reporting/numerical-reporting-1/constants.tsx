import { TFunction } from 'i18next';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

export const numericalReporting1TableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('NUMERICAL_REPORTING_1.NUMERICAL_REPORTING_1'),
  },
];

export const numericalReporting1TableHeader = {
  leftComponents: [
    <InputText
      key={1}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      size="md"
      type="text"
      status="default"
    />,
  ],
  rightComponents: [<DownloadButtons key={1} fileName={'test'} />],
};

export const numericalReporting1TableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('NUMERICAL_REPORTING_1.PARTY'),
    key: 'party',
  },
  {
    id: 2,
    name: t('NUMERICAL_REPORTING_1.APPLIED_CANDIDATE'),
    key: 'appliedCandidate',
  },
  {
    id: 3,
    name: t('NUMERICAL_REPORTING_1.CANCELED_CANDIDATE'),
    key: 'cancelesCandidate',
  },
  {
    id: 4,
    name: t('NUMERICAL_REPORTING_1.WITHDRAWN_CANDIDATE'),
    key: 'withdrawnCandidate',
  },
  {
    id: 5,
    name: t('NUMERICAL_REPORTING_1.FINAL_CANDIDATE'),
    key: 'finalCandidate',
  },
  {
    id: 6,
    name: t('NUMERICAL_REPORTING_1.PROCEDURE'),
    key: 'procedure',
  },
];

export const numericalReporting1TableRows = [
  {
    id: 1,
    party: '',
    appliedCandidate: '',
    cancelesCandidate: '',
    withdrawnCandidate: '',
    finalCandidate: '',
    procedure: '',
  },
];

export const options = (t: TFunction<'translation', undefined>) => [
  {
    name: t('NUMERICAL_REPORTING_1.EXCEL'),
    value: 'excel',
  },
  {
    name: t('NUMERICAL_REPORTING_1.PDF'),
    value: 'pdf',
  },
];
