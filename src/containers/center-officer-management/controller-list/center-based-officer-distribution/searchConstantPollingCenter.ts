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
  district: false,
  districtOptions: false,
  constituency: false,
  constituencyOptions: false,
  upazila: false,
  upazilaOptions: false,
  municipality: false,
  municipalityOptions: false,
  unionOrWard: false,
  unionOrWardOptions: false,
};

const clearUnion = {
  union: true,
};

const clearUnionOrWard = {
  unionOrWard: true,
};

const clearmunicipality = {
  ...clearUnionOrWard,
  municipality: true,
  unionOrWardOptions: true,
};

const clearUpazila = {
  ...clearUnion,
  upazila: true,
  unionOptions: true,
};

const clearConstituency = {
  constituency: true,
};

const clearDistrict = {
  ...clearUpazila,
  ...clearmunicipality,
  ...clearConstituency,
  district: true,
  constituencyOptions: true,
  upazilaOptions: true,
  municipalityOptions: true,
};

const clearElectionSchedule = {
  ...clearDistrict,
  electionSchedule: true,
  districtOptions: true,
};

export const searchStructPollingCenter = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.CORE,
    refreshData: { ...clearElectionSchedule },
    nonRefreshData: {
      electionTypeCore: false,
      electionTypeCoreOptions: false,
      electionScheduleOptions: false,
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

    notDisplay: true,
    dependentDefaultValue: [
      {
        dependentOn: APPLICATION_SEARCH.ELECTION_TYPE,
        dependentOnValue: ELECTION_INFO.CITY_CORPORATION.ID,
        ownDefaultValue: CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
      },
      {
        dependentOn: APPLICATION_SEARCH.ELECTION_TYPE,
        dependentOnValue: ELECTION_INFO.MUNICIPALITY.ID,
        ownDefaultValue: CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
      },
    ],
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,

    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
    },
    refreshData: {
      ...clearConstituency,
      ...clearUpazila,
      ...clearmunicipality,
    },
    nonRefreshData: {
      district: false,
      constituencyOptions: false,
      upazilaOptions: false,
      municipalityOptions: false,
    },
  },
  {
    fieldName: APPLICATION_SEARCH.CONSTITUENCY,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
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
    fieldName: ADVANCE_SEARCH.UPAZILA,
    pathParamsDependency: {
      'election-type': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    apiService: API_SERVICE.CORE,
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID, ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: clearUpazila,
    nonRefreshData: {
      upazila: false,
      unionOptions: false,
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
          ELECTION_INFO.CITY_CORPORATION.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
      {
        value: [
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
        ],
        watchId: APPLICATION_SEARCH.CANDIDATE_TYPE,
      },
    ],
    refreshData: { ...clearUnionOrWard },
    nonRefreshData: {
      municipality: false,
      unionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      municipalities: APPLICATION_SEARCH.MUNICIPALITY,
    },
    displayDependency: [
      {
        value: [
          ELECTION_INFO.CITY_CORPORATION.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    nonRefreshData: {
      unionOrWard: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION,
    pathParamsDependency: {
      'election-type': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    nonRefreshData: {
      union: false,
    },
  },
];

export const searchStructElectionUserPollingCenter = ({
  electionScheduleId,
  zillaId,
  upazilaId,
}: {
  electionScheduleId?: string | number;
  zillaId?: string | number;
  upazilaId?: string | number;
}) => [
  {
    fieldName: ADVANCE_SEARCH.POLLING_CENTER,
    queryParamsDependency: {
      getDirectValue: {
        electionScheduleId,
        zillaId,
        upazilaId,
      },
    },
  },
];

export const searchStructUnionParishadElectionUserPollingCenter = ({
  electionScheduleId,
  zillaId,
  upazilaId,
  unionOrWardId,
}: {
  electionScheduleId?: string | number;
  zillaId?: string | number;
  upazilaId?: string | number;
  unionOrWardId?: number[];
}) => [
  {
    fieldName: ADVANCE_SEARCH.POLLING_CENTER,
    queryParamsDependency: {
      getDirectValue: {
        electionScheduleId,
        zillaId,
        upazilaId,
        unionOrWardId,
      },
    },
  },
];
