import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { ELECTION_INFO } from '@constants/election-info';

export const allSelectedDataElaka = {
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
  municipality: false,
  municipalityOptions: false,
  electionSettingsUnionOrWard: false,
  electionSettingsUnionOrWardOptions: false,
};

const clearUnionOrWard = {
  union: true,
};

const clearupazila = {
  ...clearUnionOrWard,
  upazila: true,
};

const clearElectionSettingsUnionOrWard = {
  electionSettingsUnionOrWard: true,
};

const clearmunicipality = {
  ...clearElectionSettingsUnionOrWard,
  municipality: true,
  electionSettingsUnionOrWardOptions: true,
};

const clearMayorMunicipality = {
  municipality: true,
};

const clearUpazila = {
  upazilaAsConstituency: true,
};

const clearConstituency = {
  constituency: true,
};

const clearDistrict = {
  ...clearUpazila,
  ...clearMayorMunicipality,
  ...clearmunicipality,
  ...clearConstituency,
  ...clearupazila,
  district: true,
  constituencyOptions: true,
  upazilaAsConstituencyOptions: true,
  municipalityOptions: true,
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

export const searchStructElaka = [
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
    },
    refreshData: {
      ...clearConstituency,
      ...clearUpazila,
      ...clearMayorMunicipality,
      ...clearmunicipality,
      ...clearupazila,
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
      upazilaAsConstituencyOptions: false,
      municipalityOptions: false,
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
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
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
      municipality: false,
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
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    refreshData: { ...clearElectionSettingsUnionOrWard },
    nonRefreshData: {
      municipality: false,
      electionSettingsUnionOrWardOptions: false,
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
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    refreshData: { ...clearElectionSettingsUnionOrWard },
    nonRefreshData: {
      municipality: false,
      electionSettingsUnionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UNION_OR_WARD,
    queryParamsDependency: {
      municipalityId: APPLICATION_SEARCH.MUNICIPALITY,
    },
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],

    nonRefreshData: {
      electionSettingsUnionOrWard: false,
    },
    apiService: API_SERVICE.MASTER,
  },

  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UNION_OR_WARD,

    queryParamsDependency: {
      municipalityId: APPLICATION_SEARCH.MUNICIPALITY,
    },
    displayDependency: [
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    nonRefreshData: {
      electionSettingsUnionOrWard: false,
    },
    apiService: API_SERVICE.MASTER,
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID, ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },

    apiService: API_SERVICE.CORE,
    refreshData: clearUnionOrWard,
    nonRefreshData: {
      upazila: false,
      unionOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION,
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
    },

    nonRefreshData: {
      union: false,
    },
    apiService: API_SERVICE.CORE,
  },
  {
    fieldName: ADVANCE_SEARCH.POLLING_CENTER_TYPE,
  },
];
