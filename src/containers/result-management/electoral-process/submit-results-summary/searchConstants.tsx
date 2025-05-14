import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { ELECTION_INFO } from '@constants/election-info';
import { USER_ROLE_TYPE } from '@containers/user-management/controller-list/constants';

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
  upazilaAsConstituency: false,
  upazilaAsConstituencyOptions: false,
  municipalityAsConstituency: false,
  municipalityAsConstituencyOptions: false,
  municipality: false,
  municipalityOptions: false,
  unionOrWardAsConstituency: false,
  unionOrWardAsConstituencyOptions: false,
  userLogInId: false,
  userLogInIdOptions: false,
};
const clearUserLogInId = {
  userLogInId: true,
};
const clearUserTypeCode = {
  ...clearUserLogInId,
  userTypeCode: true,
  userLogInIdOptions: true,
};
const clearUnionOrWard = {
  ...clearUserTypeCode,
  unionOrWardAsConstituency: true,
  userTypeCodeOptions: true,
};

const clearmunicipality = {
  ...clearUnionOrWard,
  municipality: true,
  unionOrWardAsConstituencyOptions: true,
};
const clearMayorMunicipality = {
  ...clearUserTypeCode,
  municipalityAsConstituency: true,
  userTypeCodeOptions: true,
};

//for upazila election
const clearUpazilaAsConstituency = {
  ...clearUserTypeCode,
  upazilaAsConstituency: true,
  userTypeCodeOptions: true,
};

// for national election
const clearConstituency = {
  ...clearUserTypeCode,
  constituency: true,
  userTypeCodeOptions: true,
};

// from this union parishad election
const clearUnionParishadWardAsConstituency = {
  ...clearUserTypeCode,
  unionParishadWardAsConstituency: true,
  userTypeCodeOptions: true,
};

const clearUnion = {
  ...clearUnionParishadWardAsConstituency,
  union: true,
  unionParishadWardAsConstituencyOptions: true,
};

const clearUnionAsConstituency = {
  ...clearUserTypeCode,
  unionAsConstituency: true,
  userTypeCodeOptions: true,
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
  ...clearmunicipality,
  ...clearMayorMunicipality,
  ...clearConstituency,
  ...clearUpazila,
  ...clearUpazilaAsConstituency,
  district: true,
  constituencyOptions: true,
  municipalityOptions: true,
  municipalityAsConstituencyOptions: true,
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

export const structSearch = [
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

    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
    refreshData: {
      ...clearConstituency,
      ...clearUpazila,
      ...clearMayorMunicipality,
      ...clearmunicipality,
      ...clearUpazilaAsConstituency,
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
      upazilaAsConstituencyOptions: false,
      municipalityAsConstituencyOptions: false,
      municipalityOptions: false,
      upazilaOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY_AS_CONSTITUENCY,
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    refreshData: {
      ...clearUserTypeCode,
    },
    nonRefreshData: {
      municipalityAsConstituency: false,
      userTypeCodeOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },

    refreshData: {
      ...clearUserTypeCode,
    },
    nonRefreshData: {
      municipality: false,
      userTypeCodeOptions: false,
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
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    refreshData: { ...clearUserTypeCode },
    nonRefreshData: {
      unionOrWardAsConstituency: false,
      userTypeCodeOptions: false,
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
    refreshData: clearUserTypeCode,
    nonRefreshData: {
      constituency: false,
      userTypeCodeOptions: false,
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
    refreshData: clearUserTypeCode,
    nonRefreshData: {
      upazilaAsConstituency: false,
      userTypeCodeOptions: false,
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
    refreshData: clearUserTypeCode,
    nonRefreshData: {
      unionAsConstituency: false,
      userTypeCodeOptions: false,
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
    refreshData: clearUserTypeCode,
    nonRefreshData: {
      unionParishadWardAsConstituency: false,
      userTypeCodeOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.USER_TYPE_CODE,
    refreshData: clearUserLogInId,
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    userTypeCodes: USER_ROLE_TYPE.DATA_ENTRY_OFFICER,
    nonRefreshData: {
      userTypeCode: false,
      userLogInIdOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.USER_TYPE_CODE,
    refreshData: clearUserLogInId,
    displayDependency: [
      {
        value: [
          ELECTION_INFO.NATIONAL.ID,
          ELECTION_INFO.UPAZILLA.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
          ELECTION_INFO.CITY_CORPORATION.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    userTypeCodes: USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR,
    nonRefreshData: {
      userTypeCode: false,
      userLogInIdOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.USER_PROFILE_LOGIN_ID,
    queryParamsDependency: {
      electionScheduleId: APPLICATION_SEARCH.ELECTION_SCHEDULE,
      electionSettingsId: APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
      userTypeCode: APPLICATION_SEARCH.USER,
    },
    nonRefreshData: {
      userLogInId: false,
    },
  },
];
