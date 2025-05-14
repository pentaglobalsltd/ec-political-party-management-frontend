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

// from this union parishad election
const clearUnionParishadWardAsConstituency = {
  ...clearUserLogInId,
  unionParishadWardAsConstituency: true,
  userLogInIdOptions: true,
};

const clearUnion = {
  ...clearUnionParishadWardAsConstituency,
  union: true,
  unionParishadWardAsConstituencyOptions: true,
};

const clearUnionAsConstituency = {
  ...clearUserLogInId,
  unionAsConstituency: true,
  userLogInIdOptions: true,
};
const clearUpazila = {
  ...clearUnionAsConstituency,
  ...clearUnion,
  upazila: true,
  unionOptions: true,
  unionAsConstituencyOptions: true,
};
// till this union parishad election

const clearUnionOrWard = {
  ...clearUserLogInId,
  unionOrWardAsConstituency: true,
  userLogInIdOptions: true,
};

const clearmunicipality = {
  ...clearUnionOrWard,
  municipality: true,
  unionOrWardAsConstituencyOptions: true,
};
const clearMayorMunicipality = {
  ...clearUserLogInId,
  municipalityAsConstituency: true,
  userLogInIdOptions: true,
};
const clearConstituency = {
  ...clearUserLogInId,
  constituency: true,
  userLogInIdOptions: true,
};
const clearUpazilaAsConstituency = {
  ...clearUserLogInId,
  upazilaAsConstituency: true,
};
const clearDistrict = {
  ...clearmunicipality,
  ...clearMayorMunicipality,
  ...clearConstituency,
  ...clearUpazilaAsConstituency,
  ...clearUpazila,
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
      ...clearUpazilaAsConstituency,
      ...clearMayorMunicipality,
      ...clearmunicipality,
      ...clearUpazila,
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
      ...clearUserLogInId,
    },
    nonRefreshData: {
      municipalityAsConstituency: false,
      userLogInIdOptions: false,
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
      ...clearUserLogInId,
    },
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
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    refreshData: { ...clearUserLogInId },
    nonRefreshData: {
      unionOrWardAsConstituency: false,
      userLogInIdOptions: false,
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
    refreshData: clearUserLogInId,
    nonRefreshData: {
      constituency: false,
      userLogInIdOptions: false,
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
    refreshData: clearUserLogInId,
    nonRefreshData: {
      upazilaAsConstituency: false,
      userLogInIdOptions: false,
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
    refreshData: clearUserLogInId,
    nonRefreshData: {
      unionAsConstituency: false,
      userLogInIdOptions: false,
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
    refreshData: clearUserLogInId,
    nonRefreshData: {
      unionParishadWardAsConstituency: false,
      userLogInIdOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.USER_TYPE_CODE,
    refreshData: clearUserLogInId,
    userTypeCodes: `${USER_ROLE_TYPE.RETURNING_OFFICER}`,
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
  },
  {
    fieldName: ADVANCE_SEARCH.USER_TYPE_CODE,
    refreshData: clearUserLogInId,
    userTypeCodes: `${USER_ROLE_TYPE.RETURNING_OFFICER}, ${USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER}`,
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
