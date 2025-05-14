import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import CandidateTypeTitle from './components/CandidateTypeTitle';

import { CANDIDATE_INFO } from '@constants/candidate-info';
import { ELECTION_INFO } from '@constants/election-info';

export const allSelectedDataVoteCenterAddition = {
  electionType: false,
  electionTypeOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
  candidateType: false,
  candidateTypeOptions: false,
  electionSettingsVoteCenter: false,
  constituency: false,
  electionSettingsVoteCenterOptions: false,
  electionSettingsUpazila: false,
  electionSettingsUpazilaOptions: false,
  electionSettingsUnionOrWard: false,
  electionSettingsUnionOrWardOptions: false,
};

const clearElectionSettingsUnionOrWard = {
  electionSettingsUnionOrWard: true,
};
const clearElectionTypeUpazila = {
  ...clearElectionSettingsUnionOrWard,
  upazila: true,
  upazilaOptions: true,
};
const clearMunicipalities = {
  ...clearElectionSettingsUnionOrWard,
  municipality: true,
  electionSettingsUnionOrWardOptions: true,
};
const clearElectionSettingsUpazila = {
  ...clearElectionSettingsUnionOrWard,
  electionSettingsUpazila: true,
  electionSettingsUnionOrWardOptions: true,
};

const clearElectionSettingsVoteCenter = {
  ...clearMunicipalities,
  ...clearElectionSettingsUpazila,
  electionSettingsVoteCenter: true,
  constituency: true,
  municipalityOptions: true,
  electionSettingsUpazilaOptions: true,
};

const clearCandidateType = {
  ...clearElectionSettingsVoteCenter,
  candidateType: true,
  electionSettingsVoteCenterOptions: true,
};

const clearElectionSchedule = {
  ...clearElectionSettingsVoteCenter,
  electionSchedule: true,
  electionSettingsVoteCenterOptions: true,
};
export const searchStructVoteCenterAddition = [
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
    refreshData: { ...clearElectionSettingsVoteCenter },
    nonRefreshData: {
      electionSchedule: false,
      electionSettingsVoteCenterOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    titleElement: <CandidateTypeTitle />,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: { ...clearElectionSettingsVoteCenter },
    nonRefreshData: {
      candidateType: false,
      electionSettingsVoteCenterOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_VOTE_CENTER,
    queryParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
    refreshData: { ...clearElectionSettingsUpazila, ...clearMunicipalities },
    nonRefreshData: {
      electionSettingsVoteCenter: false,
      constituency: false,
      municipalityOptions: false,
      electionSettingsUpazilaOptions: false,
      electionSettingsUnionOrWardOptions: false,
    },
  },

  {
    fieldName: ADVANCE_SEARCH.DISTRICT_BY_ELECTION_SETTINGS,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_CONSTITUENCY_BY_ELECTION_SETTINGS,
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
  },

  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY_BY_ELECTION_SETTINGS,
    displayDependency: [
      {
        value: [
          ELECTION_INFO.CITY_CORPORATION.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA_BY_ELECTION_SETTINGS,
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID, ELECTION_INFO.UNION_PARISHAD.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    pathParamsDependency: {
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    apiService: API_SERVICE.MASTER,
    refreshData: { ...clearElectionSettingsUnionOrWard },
    nonRefreshData: {
      municipality: false,
      electionSettingsUnionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UPAZILA,
    queryParamsDependency: {
      constituencyIds: APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    refreshData: { ...clearElectionSettingsUnionOrWard },
    nonRefreshData: {
      electionSettingsUpazila: false,
      electionSettingsUnionOrWardOptions: false,
    },
    apiService: API_SERVICE.MASTER,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UPAZILA,
    queryParamsDependency: {
      municipalityId: APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
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
    refreshData: { ...clearElectionSettingsUnionOrWard },
    nonRefreshData: {
      electionSettingsUpazila: false,
      electionSettingsUnionOrWardOptions: false,
    },
    apiService: API_SERVICE.MASTER,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UPAZILA,
    queryParamsDependency: {
      municipalityWardIds: APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
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
      electionSettingsUpazila: false,
      electionSettingsUnionOrWardOptions: false,
    },
    apiService: API_SERVICE.MASTER,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UPAZILA,
    queryParamsDependency: {
      reservedWardIds: APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
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
      electionSettingsUpazila: false,
      electionSettingsUnionOrWardOptions: false,
    },
    apiService: API_SERVICE.MASTER,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UNION_OR_WARD,
    pathParamsDependency: {
      constituencies: APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
    },
    queryParamsDependency: {
      constituencyId: APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
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
      municipalityId: APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
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
      electionSettingsUnionOrWard: false,
    },
    apiService: API_SERVICE.MASTER,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UNION_OR_WARD,

    queryParamsDependency: {
      municipalityWardIds: APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
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
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UNION_OR_WARD,

    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      municipalityId: APPLICATION_SEARCH.MUNICIPALITY,
    },
    displayDependency: [
      {
        value: [ELECTION_INFO.UPAZILLA.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
    nonRefreshData: {
      electionSettingsUnionOrWard: false,
    },
    apiService: API_SERVICE.MASTER,
    optionalQueryParams: true,
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_BY_ELECTION_SETTINGS,
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
    queryParamsDependency: {
      electionSettingsId: APPLICATION_SEARCH.ELECTION_SETTINGS_IDS,
    },
  },
];
export const searchStructVoteCenterAdditionOP = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    titleElement: <CandidateTypeTitle />,

    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: {
      ...clearElectionSettingsUpazila,
      electionSettingsVoteCenter: true,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_VOTE_CENTER,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
    nonRefreshData: { electionSettingsVoteCenter: false },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT_BY_ELECTION_SETTINGS,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_CONSTITUENCY_BY_ELECTION_SETTINGS,
    displayDependency: [
      {
        value: [ELECTION_INFO.NATIONAL.ID],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
  },

  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY_BY_ELECTION_SETTINGS,
    displayDependency: [
      {
        value: [
          ELECTION_INFO.CITY_CORPORATION.ID,
          ELECTION_INFO.MUNICIPALITY.ID,
        ],
        watchId: APPLICATION_SEARCH.ELECTION_TYPE,
      },
    ],
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UPAZILA,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    queryParamsDependency: {
      electionSettingsId: APPLICATION_SEARCH.ELECTION_SETTINGS_IDS,
    },
    refreshData: { ...clearElectionSettingsUnionOrWard },
    nonRefreshData: {
      electionSettingsUpazila: false,
      electionSettingsUnionOrWardOptions: false,
    },
    apiService: API_SERVICE.CORE,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UNION_OR_WARD,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
      zillas: APPLICATION_SEARCH.DISTRICT,
      upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    queryParamsDependency: {
      electionSettingsId: APPLICATION_SEARCH.ELECTION_SETTINGS_IDS,
    },
    nonRefreshData: {
      electionSettingsUnionOrWard: false,
    },
    apiService: API_SERVICE.CORE,
  },
];
export const searchStructVoteCenterAdditionUpazilaElectionOfficer = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: {
      ...clearElectionTypeUpazila,
      electionSettingsVoteCenter: true,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_VOTE_CENTER,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
    refreshData: { ...clearElectionTypeUpazila },
    nonRefreshData: {
      upazilaOptions: false,
      electionSettingsVoteCenter: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT_BY_ELECTION_SETTINGS,
  },

  {
    fieldName: ADVANCE_SEARCH.UPAZILA,

    refreshData: { ...clearElectionSettingsUnionOrWard },
    nonRefreshData: {
      upazila: false,
      electionSettingsUnionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SETTINGS_UNION_OR_WARD,

    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    nonRefreshData: {
      electionSettingsUnionOrWard: false,
    },
    apiService: API_SERVICE.MASTER,
  },
];
