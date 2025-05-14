import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

export const groupBasedReportBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('GROUP_BASED_REPORT.GROUP_BASED_REPORT'),
    URL: ROUTES.GROUP_BASED_REPORT,
  },
];

export const allSelectedData = {
  electionTypeMaster: false,
  electionTypeMasterOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
  candidateType: false,
  candidateTypeOptions: false,
};

const clearCandidateType = {
  candidateType: true,
};

const clearElectionSchedule = {
  electionSchedule: true,
};

export const inputs = {
  electionTypeMaster: {
    refreshData: { ...clearElectionSchedule, ...clearCandidateType },
    nonRefreshData: {
      electionTypeMaster: false,
      electionTypeMasterOptions: false,
      electionScheduleOptions: false,
      candidateTypeOptions: false,
    },
  },
  electionSchedule: {
    nonRefreshData: {
      electionSchedule: false,
    },
  },
  candidateType: {
    nonRefreshData: {
      candidateType: false,
    },
  },
};

export const requiredFields = [
  SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
  SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
];
