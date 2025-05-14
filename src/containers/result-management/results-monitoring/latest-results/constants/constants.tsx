import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import { getDigitBanglaFromEnglish } from '@utils';
import { BartaSheetCandidateVoteCountsType } from '@type/result-management/result-monitoring/latest-results-obtained/latest-results-obtained-types';

export const latestResultsObtainedTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('LATEST_RESULTS_OBTAINED.LATEST_RESULTS_OBTAINED'),
  },
];

export const latestResultsObtainedTableColumns = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => [
  {
    id: 1,
    name: t('LATEST_RESULTS_OBTAINED.SERIAL'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('LATEST_RESULTS_OBTAINED.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 3,
    name: t('LATEST_RESULTS_OBTAINED.CANDIDATE_SYMBOL'),
    key: 'symbolName',
    render: (data: string) => {
      // for last row only
      if (data === 'মোট =')
        return (
          <Text className="d-flex justify-content-end" weight="semibold">
            {data}
          </Text>
        );
      else return data;
    },
  },
  {
    id: 4,
    name: t('LATEST_RESULTS_OBTAINED.TOTAL_VOTE_AMOUNT'),
    key: 'totalLegalVoteCount',
    render: (data: number, row: BartaSheetCandidateVoteCountsType) => {
      if (row?.symbolName === 'মোট =')
        return (
          <Text className="d-flex justify-content-start" weight="semibold">
            {getDigitBanglaFromEnglish(data?.toLocaleString('bn-BD'))}
          </Text>
        );
      else return getDigitBanglaFromEnglish(data?.toLocaleString('bn-BD'));
    },
  },
];
