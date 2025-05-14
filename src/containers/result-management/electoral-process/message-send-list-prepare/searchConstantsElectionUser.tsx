import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
export const allSelectedDataElectionUser = {
  electionSchedule: false,
  electionScheduleOptions: false,
  candidateType: false,
  candidateTypeOptions: false,
  unionOrWardAsConstituency: false,
  unionOrWardAsConstituencyOptions: false,
};

const clearUnionWardAsConstituency = {
  unionOrWardAsConstituency: true,
};
const clearUpazila = {
  upazilaAsConstituency: true,
};

const clearUnionAsConstituency = {
  unionAsConstituency: true, //for union chairman
};

const clearUnionParishadWardAsConstituency = {
  unionParishadWardAsConstituency: true, //for union members
};

const clearUnion = {
  ...clearUnionParishadWardAsConstituency,
  union: true,
  unionParishadWardAsConstituencyOptions: true,
};

const clearConstituency = {
  constituency: true,
};
export const searchStructElectionUser = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
  },
  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    refreshData: {
      ...clearConstituency,
      ...clearUnionWardAsConstituency,
      ...clearUpazila,
      ...clearUnionAsConstituency,
      ...clearUnion,
    },
  },

  {
    fieldName: APPLICATION_SEARCH.CONSTITUENCY,

    displayDependency: [
      {
        value: [CANDIDATE_INFO.NATIONAL_MEMBER_OF_PARLIAMENT.ID],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
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
  },

  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD_AS_CONSTITUENCY,
    displayDependency: [
      {
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
        ],
      },
    ],
    nonRefreshData: {
      unionOrWardAsConstituency: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA_AS_CONSTITUENCIES,
    displayDependency: [
      {
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
        value: [
          CANDIDATE_INFO.UPAZILLA_CHAIRMAN.ID,
          CANDIDATE_INFO.UPAZILLA_VICE_CHAIRMAN.ID,
          CANDIDATE_INFO.UPAZILLA_WOMEN_VICE_CHAIRMAN.ID,
        ],
      },
    ],
    nonRefreshData: {
      upazilaAsConstituency: false,
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
    nonRefreshData: {
      unionParishadWardAsConstituency: false,
    },
  },
];

export const conditionalRequiredField = [
  {
    fieldName: SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
  },
  {
    fieldName: SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
    watchId: SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
    value: [
      CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
      CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
      CANDIDATE_INFO.UPAZILLA_CHAIRMAN.ID,
      CANDIDATE_INFO.UPAZILLA_VICE_CHAIRMAN.ID,
      CANDIDATE_INFO.UPAZILLA_WOMEN_VICE_CHAIRMAN.ID,
      CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
      CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
      CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID,
      CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
      CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
    ],
  },
];
