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
