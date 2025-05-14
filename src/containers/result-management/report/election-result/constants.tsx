import { TFunction } from 'i18next';
import { IconDownloadCloud02, IconHomeLine, IconSearch } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';
import { BUTTON_TYPE } from '@constants/result-management/report';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

export const electionResultBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTION_RESULT.ELECTION_RESULT'),
    URL: ROUTES.ELECTION_RESULT,
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

  resultType: {},
};

export const requiredFields = [
  SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
  SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
  SEARCH_FIELD_REQUIRED.RESULT_TYPE,
];

export const reportOptionsShort = (t: TFunction<'translation', undefined>) => [
  {
    name: t('ELECTION_RESULT.SEARCH'),
    icon: <IconSearch size="20" />,
    value: BUTTON_TYPE.SEARCH,
    data: {
      reportType: optionsType.shortReport,
      buttonType: BUTTON_TYPE.SEARCH,
    },
  },
  {
    name: t('ELECTION_RESULT.SAVE'),
    icon: <IconDownloadCloud02 size="20" />,
    value: BUTTON_TYPE.DOWNLOAD,
    data: {
      reportType: optionsType.shortReport,
      buttonType: BUTTON_TYPE.DOWNLOAD,
    },
  },
];

export const reportOptionsDetailed = (
  t: TFunction<'translation', undefined>,
) => [
  {
    name: t('ELECTION_RESULT.SEARCH'),
    icon: <IconSearch size="20" />,
    value: BUTTON_TYPE.SEARCH,
    data: {
      reportType: optionsType.detailedReport,
      buttonType: BUTTON_TYPE.SEARCH,
    },
  },
  {
    name: t('ELECTION_RESULT.SAVE'),
    icon: <IconDownloadCloud02 size="20" />,
    value: BUTTON_TYPE.DOWNLOAD,
    data: {
      reportType: optionsType.detailedReport,
      buttonType: BUTTON_TYPE.DOWNLOAD,
    },
  },
];

export const optionsType = {
  detailedReport: 'DETAILED_REPORT',
  shortReport: 'SHORT_REPORT',
};
