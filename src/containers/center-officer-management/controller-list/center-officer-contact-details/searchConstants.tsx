import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';

export const allSelectedData = {
  electionType: false,
  electionTypeOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
  district: false,
  districtOptions: false,
  upazila: false,
  upazilaOptions: false,
};

const clearUpazila = {
  upazila: true,
};
const clearZilla = {
  ...clearUpazila,
  district: true,
  upazilaOptions: true,
};

const clearElectionSchedule = {
  ...clearZilla,
  electionSchedule: true,
  districtOptions: true,
};

// for Election users -> Upazila election
export const searchStructElectionUser = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,

    refreshData: clearUpazila,
    nonRefreshData: {
      district: false,
      upazilaOptions: false,
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
    nonRefreshData: {
      upazila: false,
    },
  },
  // {
  //   fieldName: ADVANCE_SEARCH.DESIGNATION,
  // },
  {
    fieldName: ADVANCE_SEARCH.DISTRIBUTED_OFFICER,
  },
];

// for Admin
export const searchStructAdmin = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: clearElectionSchedule,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: clearZilla,
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
    refreshData: clearUpazila,
    nonRefreshData: {
      district: false,
      upazilaOptions: false,
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
    nonRefreshData: {
      upazila: false,
    },
  },

  // {
  //   fieldName: ADVANCE_SEARCH.DESIGNATION,
  // },
  {
    fieldName: ADVANCE_SEARCH.DISTRIBUTED_OFFICER,
  },
];
