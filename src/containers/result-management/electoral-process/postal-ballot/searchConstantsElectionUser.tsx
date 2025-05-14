import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { ELECTION_INFO } from '@constants/election-info';

export const allSelectedDataElectionUser = {
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
  district: true,
  constituencyOptions: true,
  upazilaAsConstituencyOptions: true,
  municipalityAsConstituencyOptions: true,
  municipalityOptions: true,
};

export const clearCandidateType = {
  ...clearDistrict,
  candidateType: true,
  districtOptions: true,
};

export const clearElectionSchedule = {
  ...clearDistrict,
  electionSchedule: true,
  districtOptions: true,
};

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
    nonRefreshData: {
      municipalityAsConstituencyOptions: false,
      municipalityOptions: false,
      upazilaAsConstituencyOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
  },
  {
    fieldName: APPLICATION_SEARCH.CONSTITUENCY,

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

    displayDependency: [
      {
        value: [ELECTION_INFO.CITY_CORPORATION.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
      {
        value: [CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    nonRefreshData: {
      municipalityAsConstituency: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,

    displayDependency: [
      {
        value: [ELECTION_INFO.CITY_CORPORATION.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
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

    displayDependency: [
      {
        value: [ELECTION_INFO.CITY_CORPORATION.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    nonRefreshData: {
      unionOrWardAsConstituency: false,
    },
  },
];
