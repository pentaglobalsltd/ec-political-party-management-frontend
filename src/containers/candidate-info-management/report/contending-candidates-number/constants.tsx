import { TFunction } from 'i18next';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

export const contendingCandidatesNumberTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CONTENDING_CANDIDATES_NUMBER.CONTENDING_CANDIDATES_NUMBER'),
  },
];

export const contendingCandidatesNumberTableHeader = {
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

export const contendingCandidatesNumberTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CONTENDING_CANDIDATES_NUMBER.ID'),
    key: 'id',
  },
  {
    id: 2,
    name: t('CONTENDING_CANDIDATES_NUMBER.SEAT_NAME'),
    key: 'candidateType',
  },
  {
    id: 3,
    name: t('CONTENDING_CANDIDATES_NUMBER.SUBMITTED_CANDIDATES_NUMBER'),
    key: 'submittedCandidatesNumber',
  },
  {
    id: 4,
    name: t('CONTENDING_CANDIDATES_NUMBER.WITHDRAWN_CANDIDATES_NUMBER'),
    key: 'withdrawnCandidatesNumber',
  },
  {
    id: 5,
    name: t('CONTENDING_CANDIDATES_NUMBER.FINAL_CANDIDATES_NUMBER'),
    key: 'finalCandidatesNumber',
  },
];
