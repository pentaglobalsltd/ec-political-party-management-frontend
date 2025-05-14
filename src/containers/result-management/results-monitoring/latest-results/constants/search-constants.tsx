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
  district: false,
  districtOptions: false,
  constituency: false,
  constituencyOptions: false,
};

const clearConstituency = {
  constituency: true,
};

const clearUnionOrWard = {
  ...clearConstituency,
  unionOrWard: true,
  constituencyOptions: true,
};

const clearMunicipality = {
  ...clearConstituency,
  municipality: true,
  constituencyOptions: true,
};

const clearUpazila = {
  ...clearUnionOrWard,
  upazila: true,
  unionOrWardOptions: true,
};

const clearDistrict = {
  ...clearMunicipality,
  ...clearUpazila,
  district: true,
  municipalityOptions: true,
  upazilaOptions: true,
};

const clearElectionSchedule = {
  ...clearDistrict,
  electionSchedule: true,
  districtOptions: true,
};

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: { ...clearElectionSchedule },
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
    fieldName: ADVANCE_SEARCH.DISTRICT,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
    },
    refreshData: {
      ...clearMunicipality,
      ...clearUpazila,
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
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
    refreshData: clearConstituency,
    nonRefreshData: {
      municipality: false,
      constituencyOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    pathParamsDependency: {
      'election-type': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    apiService: API_SERVICE.CORE,
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID, ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: {
      ...clearConstituency,
      ...clearUnionOrWard,
    },
    nonRefreshData: {
      upazila: false,
      unionOrWardOptions: false,
      constituencyOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    apiService: API_SERVICE.MASTER,
    queryParamsDependency: {
      zillaId: APPLICATION_SEARCH.DISTRICT,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    refreshData: clearConstituency,
    nonRefreshData: {
      unionOrWard: false,
      constituencyOptions: false,
    },
  },

  // for National election
  {
    fieldName: ADVANCE_SEARCH.SETTINGS_FOR_LATEST_RESULT_OBTAINED,
    queryParamsDependency: {
      electionScheduleId: APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillaId: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: {
      constituency: false,
    },
  },

  // for City Corp & Municipality elections
  {
    fieldName: ADVANCE_SEARCH.SETTINGS_FOR_LATEST_RESULT_OBTAINED,
    queryParamsDependency: {
      electionScheduleId: APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillaId: APPLICATION_SEARCH.DISTRICT,
      municipalityId: APPLICATION_SEARCH.MUNICIPALITY,
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
    refreshData: {
      constituency: false,
    },
  },

  // for Upazila election
  {
    fieldName: ADVANCE_SEARCH.SETTINGS_FOR_LATEST_RESULT_OBTAINED,
    queryParamsDependency: {
      electionScheduleId: APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillaId: APPLICATION_SEARCH.DISTRICT,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: {
      constituency: false,
    },
  },

  // for Union Parishad election
  {
    fieldName: ADVANCE_SEARCH.SETTINGS_FOR_LATEST_RESULT_OBTAINED,
    queryParamsDependency: {
      electionScheduleId: APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillaId: APPLICATION_SEARCH.DISTRICT,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      unionOrWardId: APPLICATION_SEARCH.UNION_OR_WARD,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: {
      constituency: false,
    },
  },
];

export const searchStructNational = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: { ...clearElectionSchedule },
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
    fieldName: ADVANCE_SEARCH.DISTRICT,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
    },
    refreshData: {
      ...clearConstituency,
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
    },
  },
  // for National election
  {
    fieldName: ADVANCE_SEARCH.SETTINGS_FOR_LATEST_RESULT_OBTAINED,
    queryParamsDependency: {
      electionScheduleId: APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillaId: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: {
      constituency: false,
    },
  },
];
export const searchRequiredFields = [
  SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
  SEARCH_FIELD_REQUIRED.ZILLA_ID,
  SEARCH_FIELD_REQUIRED.CONSTITUENCY_ID,
];
