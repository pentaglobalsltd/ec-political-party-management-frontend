import { IconHomeLine } from '@pentabd/icons';
import { getDigitBanglaFromEnglish } from '@utils';
import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';
import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';

import { getDynamicColumns } from './helper/getDynamicColumns';

export const candidateNominationStatisticsBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_NOMINATION_STATISTICS.CANDIDATE_NOMINATION_STATISTICS'),
  },
];

export const candidateNominationStatisticsTableColumns = ({
  t,
  params,
}: {
  t: TFunction<'translation', undefined>;
  params: any;
}) => [
  {
    id: 1,
    name: t('CANDIDATE_NOMINATION_STATISTICS.SERIAL'),
    key: 'id',
    render: (data: any, raw: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },
  {
    id: 2,
    name: t('CANDIDATE_NOMINATION_STATISTICS.STATUS_NAME'),
    key: 'statusNameBn',
  },

  // ===========================

  ...getDynamicColumns({ params, t }),

  // ===========================

  {
    id: 6,
    name: t('CANDIDATE_NOMINATION_STATISTICS.NUMBER'),
    key: 'totalCounts',
  },
];

export const paymentTableColumns = ({
  t,
  params,
}: {
  t: TFunction<'translation', undefined>;
  params: any;
}) => [
  {
    id: 1,
    name: t('CANDIDATE_NOMINATION_STATISTICS.SERIAL'),
    key: 'id',
    render: (data: any, raw: any) => {
      return <Text>{getDigitBanglaFromEnglish(data)}</Text>;
    },
  },
  {
    id: 2,
    name: t('CANDIDATE_NOMINATION_STATISTICS.PAYMENT_METHOD'),
    key: 'paymentMethod',
  },

  // ===========================

  ...getDynamicColumns({ params, t }),

  // ===========================

  {
    id: 6,
    name: t('CANDIDATE_NOMINATION_STATISTICS.NUMBER'),
    key: 'totalCounts',
  },
];

export const allSelectedData = {
  electionType: false,
  electionTypeOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
};

const clearElectionSchedule = {
  electionSchedule: true,
};

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.CORE,
    refreshData: { ...clearElectionSchedule },
    nonRefreshData: {
      electionTypeCore: false,
      electionTypeCoreOptions: false,
      electionScheduleOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },

    nonRefreshData: {
      electionSchedule: false,
    },
  },
];
