import { API_SERVICE } from '@components/application-search/constants';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { ADVANCE_SEARCH } from '@components/application-search/SearchComponents';

export const allSelectedData = {
  electionTypeMaster: false,
  electionTypeMasterOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
  region:false,
  regionOptions:false
};

const clearElectionSchedule = {
  electionSchedule: true,
  districtOptions: true,
};

export const inputs = {
  electionTypeMaster: {
    refreshData: { ...clearElectionSchedule },
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
      districtOptions: false,
    },
  },
};

export const searchStruct = [
  { fieldName: ADVANCE_SEARCH.ELECTION_TYPE, 
    apiService: API_SERVICE.MASTER ,
    refreshData: {
      electionSchedule: true,
      region:true,
    },
    nonRefreshData: {
      electionScheduleOptions: false,
      electionTypeMaster: false,
      electionTypeMasterOptions: false,
      regionOptions:false
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    apiService: '',
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: {
      region:true,
    },
    nonRefreshData: {
      electionSchedule: false,
      electionScheduleOptions: false,
      regionOptions:false
    },
  },
  // { fieldName: ADVANCE_SEARCH.DIVISION,
  //   refreshData: {

  //   },
  //   nonRefreshData: {
  //     region:false,
  //   },

  //  },
];
