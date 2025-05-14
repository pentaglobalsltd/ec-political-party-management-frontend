import { API_SERVICE } from '@components/application-search/constants';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { ADVANCE_SEARCH } from '@components/application-search/SearchComponents';

export const allSelectedData = {
  electionTypeMaster: false,
  electionTypeMasterOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
  candidateType: false,
  candidateTypeOptions: false,
  district: false,
  districtOptions: false,
};

const clearDistrict = {
  district: true,
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
    refreshData: { ...clearDistrict },
    nonRefreshData: {
      electionSchedule: false,
      districtOptions: false,
    },
  },
  candidateType: {
    refreshData: { ...clearDistrict },
    nonRefreshData: {
      candidateType: false,
      districtOptions: false,
    },
  },
  district: {
    nonRefreshData: {
      district: false,
    },
  },
};

export const searchStruct = [
  { fieldName: ADVANCE_SEARCH.ELECTION_TYPE, apiService: API_SERVICE.MASTER },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    apiService: '',
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
  },

  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    apiService: '',
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    apiService: '',
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.IS_ACTIVE,
  },
];
