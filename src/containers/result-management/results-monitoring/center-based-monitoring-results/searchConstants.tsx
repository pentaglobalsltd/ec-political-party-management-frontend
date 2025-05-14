import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import { CANDIDATE_INFO } from '@constants/candidate-info';
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
  municipalityAsConstituency: false,
  municipalityAsConstituencyOptions: false,
  municipality: false,
  municipalityOptions: false,
  unionOrWardAsConstituency: false,
  unionOrWardAsConstituencyOptions: false,
};

const clearUnionOrWard = {
  unionOrWardAsConstituency: true,
};

const clearmunicipality = {
  ...clearUnionOrWard,
  municipality: true,
  unionOrWardAsConstituencyOptions: true,
};

const clearMayorMunicipality = {
  municipalityAsConstituency: true,
};
//for upazila election
const clearUpazilaAsConstituency = {
  upazilaAsConstituency: true,
};

// for national election
const clearConstituency = {
  constituency: true,
};

// from this union parishad election
const clearUnionParishadWardAsConstituency = {
  unionParishadWardAsConstituency: true,
};

const clearUnion = {
  ...clearUnionParishadWardAsConstituency,
  union: true,
  unionParishadWardAsConstituencyOptions: true,
};

const clearUnionAsConstituency = {
  unionAsConstituency: true,
};

const clearUpazila = {
  ...clearUnionAsConstituency,
  ...clearUnion,
  upazila: true,
  unionOptions: true,
  unionAsConstituencyOptions: true,
};
// till this union parishad election

const clearDistrict = {
  ...clearMayorMunicipality,
  ...clearmunicipality,
  ...clearConstituency,
  ...clearUpazila,
  ...clearUpazilaAsConstituency,
  district: true,
  constituencyOptions: true,
  municipalityAsConstituencyOptions: true,
  municipalityOptions: true,
  upazilaAsConstituencyOptions: true,
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

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: { ...clearElectionSchedule, ...clearCandidateType },
    nonRefreshData: {
      electionTypeCore: false,
      electionTypeCoreOptions: false,
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

    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
    refreshData: {
      ...clearConstituency,
      ...clearMayorMunicipality,
      ...clearmunicipality,
      ...clearUpazila,
      ...clearUpazilaAsConstituency,
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
      municipalityAsConstituencyOptions: false,
      municipalityOptions: false,
      upazilaAsConstituencyOptions: false,
      upazilaOptions: false,
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
    fieldName: ADVANCE_SEARCH.UPAZILA_AS_CONSTITUENCIES,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    nonRefreshData: {
      upazilaAsConstituency: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY_AS_CONSTITUENCY,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    nonRefreshData: {
      municipalityAsConstituency: false,
    },
  },

  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    refreshData: { ...clearUnionOrWard },
    nonRefreshData: {
      municipality: false,
      unionOrWardAsConstituencyOptions: false,
    },
  },

  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD_AS_CONSTITUENCY,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      municipalities: APPLICATION_SEARCH.MUNICIPALITY,
    },
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    nonRefreshData: {
      unionOrWardAsConstituency: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    apiService: API_SERVICE.CORE,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    refreshData: { ...clearUnionAsConstituency, ...clearUnion },
    nonRefreshData: {
      upazila: false,
      unionOptions: false,
      unionAsConstituencyOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_AS_CONSTITUENCY,
    displayDependency: [
      {
        value: [CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    apiService: API_SERVICE.CORE,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    queryParamsDependency: {
      upazillaId: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    nonRefreshData: {
      unionAsConstituency: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION,
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
          CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    apiService: API_SERVICE.CORE,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    refreshData: clearUnionParishadWardAsConstituency,
    nonRefreshData: {
      union: false,
      unionParishadWardAsConstituencyOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_PARISHAD_WARD_AS_CONSTITUENCY,
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
          CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    apiService: API_SERVICE.CORE,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
      'union-or-wards': APPLICATION_SEARCH.UNION_OR_WARD,
    },
    nonRefreshData: {
      unionParishadWardAsConstituency: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.RESULT_STATUS,
  },
];
