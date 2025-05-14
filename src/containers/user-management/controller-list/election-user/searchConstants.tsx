import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import { ELECTION_INFO } from '@constants/election-info';

export const allSelectedData = {
  electionType: false,
  electionTypeOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
  candidateType: false,
  candidateTypeOptions: false,
  district: false,
  districtOptions: false,
  constituency: false,
  constituencyOptions: false,
  municipality: false,
  municipalityOptions: false,
};

const clearmunicipality = {
  municipality: true,
};

const clearConstituency = {
  constituency: true,
};

const clearDistrict = {
  ...clearmunicipality,
  ...clearConstituency,
  district: true,
  constituencyOptions: true,
  municipalityOptions: true,
};

const clearCandidateType = {
  ...clearDistrict,
  candidateType: true,
  districtOptions: true,
};

const clearElectionSchedule = {
  ...clearDistrict,
  electionSchedule: true,
  districtOptions: true,
};

export const structSearch = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: { ...clearElectionSchedule, ...clearCandidateType },
    nonRefreshData: {
      electionType: false,
      electionTypeOptions: false,
      electionScheduleOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: { ...clearDistrict },
    nonRefreshData: {
      electionSchedule: false,
      districtOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,

    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: { ...clearDistrict },
    nonRefreshData: {
      candidateType: false,
      districtOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
    refreshData: {
      ...clearConstituency,
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    displayDependency: [
      {
        value: [ELECTION_INFO.CITY_CORPORATION.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
    },
    refreshData: {
      ...clearmunicipality,
    },
    nonRefreshData: {
      district: false,
      municipalityOptions: false,
    },
  },
  {
    fieldName: APPLICATION_SEARCH.CONSTITUENCY,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],

    nonRefreshData: {
      constituency: false,
    },
  },

  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.CITY_CORPORATION.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    nonRefreshData: {
      municipality: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.USER_TYPE_CODE,
  },
];
