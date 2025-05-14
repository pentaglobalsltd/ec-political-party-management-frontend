import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
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
};

const clearUpazila = {
  upazila: true,
};
const clearmunicipality = {
  municipality: true,
  unionOrWardAsConstituencyOptions: true,
};

const clearMayorMunicipality = {
  municipalityAsConstituency: true,
};

const clearConstituency = {
  constituency: true,
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
      upazilaOptions: false,
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
    nonRefreshData: {
      municipalityAsConstituency: false,
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
    nonRefreshData: {
      municipality: false,
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
    nonRefreshData: {
      upazila: false,
    },
  },
];
