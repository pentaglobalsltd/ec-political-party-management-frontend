import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const draftResultsTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DRAFT_RESULTS.DRAFT_RESULTS'),
  },
];

export const draftResultsTableColumns = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t('DRAFT_RESULTS.RECEIVING_CENTER'),
    key: 'totalPollingCenters',
  },
  {
    id: 2,
    name: t('DRAFT_RESULTS.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 3,
    name: t('DRAFT_RESULTS.RECEIVING_VOTE'),
    key: 'receivedVote',
  },
  {
    id: 4,
    name: t('DRAFT_RESULTS.REJECTED_VOTE'),
    key: 'totalIllegalVote',
  },
  {
    id: 5,
    name: t('DRAFT_RESULTS.SITUATION_RATE'),
    key: 'attendancePercentage',
  },
];
