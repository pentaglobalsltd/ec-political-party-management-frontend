import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
// import { ELECTION_INFO } from '@constants/election-info';
// import { CANDIDATE_INFO } from '@constants/candidate-info';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

export const requiredFields = [
  SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
];

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
  upazilaThana: false,
  upazilaThanaOptions: false,
  unionOrWardAsConstituency: false,
  unionOrWardAsConstituencyOptions: false,
};

const clearUnionOrWard = {
  unionOrWardAsConstituency: true,
};

const clearUpazilaOrThanas = {
  ...clearUnionOrWard,
  upazilaThana: true,
  unionOrWardAsConstituencyOptions: true,
};

const clearmunicipality = {
  ...clearUpazilaOrThanas,
  municipality: true,
  upazilaThanaOptionsOptions: true,
  unionOrWardAsConstituencyOptions: true,
};

const clearMayorMunicipality = {
  municipalityAsConstituency: true,
};

const clearUpazila = {
  upazilaAsConstituency: true,
};

const clearConstituency = {
  constituency: true,
};

const clearDistrict = {
  ...clearMayorMunicipality,
  ...clearmunicipality,
  ...clearConstituency,
  ...clearUpazila,
  district: true,
  constituencyOptions: true,
  upazilaAsConstituencyOptions: true,
  municipalityAsConstituencyOptions: true,
  municipalityOptions: true,
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

export const searchStructAdmin = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.CORE,
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
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
      upazilaAsConstituencyOptions: false,
      municipalityAsConstituencyOptions: false,
      municipalityOptions: false,
    },
  },
  // TODO -> uncomment after backend queryParam implementation in api
  // {
  //   fieldName: APPLICATION_SEARCH.CONSTITUENCY,
  //   pathParamsDependency: {
  //     'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
  //     'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     zillas: APPLICATION_SEARCH.DISTRICT,
  //   },
  //   displayDependency: [
  //     {
  //       value: [ELECTION_INFO.NATIONAL.ID],
  //       watchId: APPLICATION_SEARCH.ELECTION_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     constituency: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.UPAZILA_AS_CONSTITUENCIES,
  //   pathParamsDependency: {
  //     'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
  //     'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     zillas: APPLICATION_SEARCH.DISTRICT,
  //   },
  //   displayDependency: [
  //     {
  //       value: [ELECTION_INFO.UPAZILLA.ID],
  //       watchId: APPLICATION_SEARCH.ELECTION_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     upazilaAsConstituency: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.MUNICIPALITY_AS_CONSTITUENCY,
  //   pathParamsDependency: {
  //     'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
  //     'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     zillas: APPLICATION_SEARCH.DISTRICT,
  //   },
  //   displayDependency: [
  //     {
  //       value: [
  //         CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID,
  //       ],
  //       watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     municipalityAsConstituency: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.MUNICIPALITY,
  //   pathParamsDependency: {
  //     'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
  //     'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     zillas: APPLICATION_SEARCH.DISTRICT,
  //   },
  //   displayDependency: [
  //     {
  //       value: [
  //         CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
  //         CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
  //       ],
  //       watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     },
  //   ],
  //   refreshData: { ...clearUpazilaOrThanas, ...clearUnionOrWard },
  //   nonRefreshData: {
  //     municipality: false,
  //     upazilaThanaOptionsOptions: false,
  //     unionOrWardAsConstituencyOptions: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.UPAZILA_THANA,
  //   pathParamsDependency: {
  //     'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
  //     'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     zillas: APPLICATION_SEARCH.DISTRICT,
  //     municipalities: APPLICATION_SEARCH.MUNICIPALITY,
  //   },
  //   displayDependency: [
  //     {
  //       value: [
  //         CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
  //       ],
  //       watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     },
  //   ],
  //   refreshData: { ...clearUnionOrWard },
  //   nonRefreshData: {
  //     upazilaThana: false,
  //     unionOrWardAsConstituencyOptions: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.UNION_OR_WARD_AS_CONSTITUENCY,
  //   pathParamsDependency: {
  //     'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
  //     'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     zillas: APPLICATION_SEARCH.DISTRICT,
  //     municipalities: APPLICATION_SEARCH.MUNICIPALITY,
  //   },
  //   displayDependency: [
  //     {
  //       value: [
  //         CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
  //       ],
  //       watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     unionOrWardAsConstituency: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.UNION_OR_WARD_AS_CONSTITUENCY,
  //   pathParamsDependency: {
  //     'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
  //     'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     zillas: APPLICATION_SEARCH.DISTRICT,
  //     municipalities: APPLICATION_SEARCH.MUNICIPALITY,
  //     'upazilas-or-thanas': APPLICATION_SEARCH.UPAZILA_THANA,
  //   },
  //   displayDependency: [
  //     {
  //       value: [
  //         CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
  //       ],
  //       watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     unionOrWardAsConstituency: false,
  //   },
  // },
];

export const searchStructElectionUser = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
  },
  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    refreshData: {
      ...clearMayorMunicipality,
      ...clearmunicipality,
      ...clearConstituency,
      ...clearUpazila,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
  },
  // TODO -> uncomment after backend queryParam implementation in api
  // {
  //   fieldName: APPLICATION_SEARCH.CONSTITUENCY,

  //   displayDependency: [
  //     {
  //       value: [ELECTION_INFO.NATIONAL.ID],
  //       watchId: APPLICATION_SEARCH.ELECTION_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     constituency: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.UPAZILA_AS_CONSTITUENCIES,

  //   displayDependency: [
  //     {
  //       value: [ELECTION_INFO.UPAZILLA.ID],
  //       watchId: APPLICATION_SEARCH.ELECTION_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     upazilaAsConstituency: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.MUNICIPALITY_AS_CONSTITUENCY,

  //   displayDependency: [
  //     {
  //       value: [
  //         CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID,
  //       ],
  //       watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     municipalityAsConstituency: false,
  //   },
  // },
  // {
  //   fieldName: ADVANCE_SEARCH.MUNICIPALITY,

  //   displayDependency: [
  //     {
  //       value: [
  //         CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
  //         CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
  //       ],
  //       watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     municipality: false,
  //     unionOrWardAsConstituencyOptions: false,
  //   },
  // },

  // {
  //   fieldName: ADVANCE_SEARCH.UNION_OR_WARD_AS_CONSTITUENCY,

  //   displayDependency: [
  //     {
  //       value: [
  //         CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
  //         CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
  //         CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
  //       ],
  //       watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
  //     },
  //   ],
  //   nonRefreshData: {
  //     unionOrWardAsConstituency: false,
  //   },
  // },
];
