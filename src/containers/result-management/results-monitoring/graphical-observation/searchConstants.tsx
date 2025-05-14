import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import { ELECTION_INFO } from '@constants/election-info';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

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

  upazila: false,
  upazilaOptions: false,

  municipality: false,
  municipalityOptions: false,

  union: false,
  unionOptions: false,
};

const clearUnion = {
  union: true,
};

const clearMunicipality = {
  municipality: true,
};

const clearUpazila = {
  ...clearUnion,
  unionOptions: true,
  upazila: true,
};
const clearDistrict = {
  ...clearMunicipality,
  ...clearUpazila,
  district: true,
  constituencyOptions: true,
  municipalityOptions: true,
  upazilaOptions: true,
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

export const conditionalRequiredField = [
  {
    fieldName: SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  },

  {
    fieldName: SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
  },

  {
    fieldName: SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
  },

  {
    fieldName: SEARCH_FIELD_REQUIRED.ZILLA_ID,
    watchId: SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
    value: [ELECTION_INFO.UPAZILLA.ID],
  },
];

export const searchStructAdmin = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: { ...clearElectionSchedule, ...clearCandidateType },
    nonRefreshData: {
      electionType: false,
      electionTypeOptions: false,
      electionScheduleOptions: false,
      candidateTypeOptions: false,
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
        value: [
          ELECTION_INFO.CITY_CORPORATION.ID,
          ELECTION_INFO.UPAZILLA.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
          ELECTION_INFO.UNION_PARISHAD.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
    refreshData: {
      ...clearUpazila,
      ...clearMunicipality,
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
      upazilaOptions: false,
      municipalityOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    displayDependency: [
      {
        value: [
          ELECTION_INFO.CITY_CORPORATION.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    nonRefreshData: {
      municipality: false,
    },
  },

  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    apiService: API_SERVICE.CORE,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID, ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: clearUnion,
    nonRefreshData: {
      upazila: false,
      unionOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION,
    apiService: API_SERVICE.CORE,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    nonRefreshData: {
      union: false,
    },
  },
];
