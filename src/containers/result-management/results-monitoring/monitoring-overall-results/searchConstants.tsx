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
  district: false,
  districtOptions: false,
  constituency: false,
  constituencyOptions: false,
  municipality: false,
  municipalityOptions: false,
};

const clearUnion = {
  union: true,
};
const clearmunicipality = {
  municipality: true,
};

const clearUpazila = {
  ...clearUnion,
  upazila: true,
  unionOptions: true,
};
const clearConstituency = {
  constituency: true,
};

const clearDistrict = {
  ...clearmunicipality,
  ...clearConstituency,
  ...clearUpazila,
  district: true,
  constituencyOptions: true,
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
      ...clearmunicipality,
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
    fieldName: APPLICATION_SEARCH.CONSTITUENCY,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
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
    apiService: API_SERVICE.CORE,
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
    pathParamsDependency: {
      'election-type': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    apiService: API_SERVICE.CORE,
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
