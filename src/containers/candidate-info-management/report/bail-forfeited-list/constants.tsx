import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';
import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

export const BailForfeitedListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('BAIL_FORFEITED_LIST.BAIL_FORFEITED_LIST'),
  },
];

export const BailForfeitedListTableColumns = ({
  t,
  electionTypeId,
  candidateTypeId,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeId: string;
  candidateTypeId: string;
}) => [
  {
    id: 1,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.SERIAL'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.ZILLA'),
    key: 'zillaNameBn',
  },

  ...dynamicColumnForElectionConstituency({
    t,
    params: { electionTypeId, candidateTypeId },
  }),

  {
    id: 4,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.CANDIDATE_TYPE'),
    key: 'candidateTypeNameBn',
  },
  {
    id: 5,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.CANDIDATE_NAME'),
    key: 'candidateNameBn',
  },
  {
    id: 6,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.CANDIDATE_NID'),
    key: 'candidateNid',
    render: (data?: string) => <Text size="sm">{data}</Text>,
  },
  {
    id: 7,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.PHONE'),
    key: 'phone',
    render: (data?: string) => <Text size="sm">{data}</Text>,
  },
  {
    id: 8,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.TOTAL_CASTED_VOTE'),
    key: 'totalCastedVote',
  },
  {
    id: 9,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.CANDIDATE_VOTE'),
    key: 'candidateVoteCount',
  },
  {
    id: 10,
    name: t('BAIL_FORFEITED_LIST.TABLE_COLS.PERCENTAGE'),
    key: 'candidateVoteCountPercentage',
    render: (data?: string) => <Text size="sm">{data}</Text>,
  },
];
