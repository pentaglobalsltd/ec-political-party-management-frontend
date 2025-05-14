import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import { ELECTION_INFO } from '@constants/election-info';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

export const allSelectedDataForAdmin = {
  electionType: false,
  electionTypeOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
  candidateType: false,
  candidateTypeOptions: false,
  district: false,
  districtOptions: false,
  municipality: false,
  municipalityOptions: false,
  upazilla: false,
  upazillaOptions: false,
  union: false,
  unionOptions: false,
};

const clearMunicipality = {
  municipality: true,
};

//for upazila election
const clearUpazilaAsConstituency = {
  upazilaAsConstituency: true,
};

// for national election
const clearConstituency = {
  constituency: true,
};

const clearUnion = {
  union: true,
};

const clearUpazila = {
  ...clearUnion,
  upazila: true,
  unionOptions: true,
};
// till this union parishad election

const clearDistrict = {
  ...clearUpazila,
  ...clearMunicipality,
  district: true,
  municipalityOptions: true,
  upazillaOptions: true,
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

export const searchStructElectionUser = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
  },

  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
  },

  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [
          ELECTION_INFO.CITY_CORPORATION.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    nonRefreshData: {
      municipality: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,

    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID, ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
  },
  {
    fieldName: ADVANCE_SEARCH.UNION,
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    apiService: API_SERVICE.CORE,
    nonRefreshData: {
      union: false,
    },
  },
];

export const conditionalRequiredField = [
  {
    fieldName: SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  },
  {
    fieldName: SEARCH_FIELD_REQUIRED.MUNICIPALITY,
    watchId: SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
    value: [ELECTION_INFO.CITY_CORPORATION.ID, ELECTION_INFO.MUNICIPALITY.ID],
  },
  {
    fieldName: SEARCH_FIELD_REQUIRED.UPAZILA_ID,
    watchId: SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
    value: [ELECTION_INFO.UPAZILLA.ID],
  },
];

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: {
      ...clearElectionSchedule,
      ...clearCandidateType,
    },
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
    fieldName: ADVANCE_SEARCH.DISTRICT,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
    },

    refreshData: {
      ...clearUpazila,
      ...clearMunicipality,
    },
    nonRefreshData: {
      district: false,
      municipalityOptions: false,
      upazilaOptions: false,
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
        value: [
          ELECTION_INFO.CITY_CORPORATION.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    nonRefreshData: {
      municipality: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    pathParamsDependency: {
      'election-type': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
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
    apiService: API_SERVICE.CORE,
  },
  {
    fieldName: ADVANCE_SEARCH.UNION,
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    apiService: API_SERVICE.CORE,
    pathParamsDependency: {
      'election-type': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    nonRefreshData: {
      union: false,
    },
  },
];
