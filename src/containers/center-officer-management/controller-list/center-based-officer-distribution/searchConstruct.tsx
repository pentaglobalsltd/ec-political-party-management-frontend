import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE, RMO } from '@components/application-search/constants';

const clearInstitute = {
  institute: true,
};
const clearUnionWard = {
  ...clearInstitute,
  unionOrWard: true,
  instituteOptions: true,
};
const clearMunicipality = {
  ...clearUnionWard,
  municipality: true,
  unionOrWardOptions: true,
};
const clearRmo = {
  ...clearMunicipality,
  rmo: true,
  municipalityOptions: true,
};
const clearUpazila = {
  ...clearRmo,
  upazila: true,
  rmoOptions: true,
};

const clearZilla = {
  ...clearUpazila,
  district: true,
  upazilaOptions: true,
};

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: { electionSchedule: true },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
  },
  { fieldName: ADVANCE_SEARCH.DIVISION, refreshData: clearZilla },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    queryParamsDependency: {
      regionId: APPLICATION_SEARCH.DIVISION,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearUpazila,
    nonRefreshData: {
      district: false,
      upazilaOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    queryParamsDependency: {
      regionId: APPLICATION_SEARCH.DIVISION,
      zillaId: APPLICATION_SEARCH.DISTRICT,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearRmo,
    nonRefreshData: {
      upazila: false,
      rmoOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.RMO,
    refreshData: clearMunicipality,
    nonRefreshData: {
      rmo: false,
      municipalityOptions: false,
      unionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    displayDependency: [
      {
        value: [RMO.CITY, RMO.CANTONMENT, RMO.RURAL, RMO.OTHER],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      regionId: APPLICATION_SEARCH.DIVISION,
      rmoEn: APPLICATION_SEARCH.RMO,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearInstitute,
    nonRefreshData: {
      unionOrWard: false,
      instituteOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    displayDependency: [
      {
        value: [RMO.MUNICIPALITY, RMO.CITY_CORPORATION],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    pathParamsDependency: { upazilas: APPLICATION_SEARCH.SUB_DISTRICT },
    queryParamsDependency: {
      rmoEn: APPLICATION_SEARCH.RMO,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearUnionWard,
    nonRefreshData: {
      municipality: false,
      unionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    displayDependency: [
      {
        value: [RMO.MUNICIPALITY, RMO.CITY_CORPORATION],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      regionId: APPLICATION_SEARCH.DIVISION,
      municipalityId: APPLICATION_SEARCH.MUNICIPALITY,
      rmoEn: APPLICATION_SEARCH.RMO,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearInstitute,
    nonRefreshData: {
      unionOrWard: false,
      instituteOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.INSTITUTE_NAME,
    queryParamsDependency: {
      zillaId: APPLICATION_SEARCH.DISTRICT,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      unionOrWardId: APPLICATION_SEARCH.UNION_OR_WARD,
    },
    displayDependency: [
      {
        value: [RMO.CITY, RMO.CANTONMENT, RMO.OTHER, RMO.RURAL],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    nonRefreshData: { institute: false },
  },
  {
    fieldName: ADVANCE_SEARCH.INSTITUTE_NAME,
    queryParamsDependency: {
      zillaId: APPLICATION_SEARCH.DISTRICT,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      municipalityId: APPLICATION_SEARCH.MUNICIPALITY,
      unionOrWardId: APPLICATION_SEARCH.UNION_OR_WARD,
    },
    displayDependency: [
      {
        value: [RMO.MUNICIPALITY, RMO.CITY_CORPORATION],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    nonRefreshData: { institute: false },
  },
  {
    fieldName: ADVANCE_SEARCH.DESIGNATION,
  },
];

export const searchStructElectionUser = [
  {
    fieldName: ADVANCE_SEARCH.DIVISION,
    refreshData: clearZilla,
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    queryParamsDependency: {
      regionId: APPLICATION_SEARCH.DIVISION,
    },
    apiService: API_SERVICE.MASTER,
    electionUserDataUsingApi: true,
    refreshData: clearUpazila,
    nonRefreshData: {
      district: false,
      upazilaOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    queryParamsDependency: {
      regionId: APPLICATION_SEARCH.DIVISION,
      zillaId: APPLICATION_SEARCH.DISTRICT,
    },
    apiService: API_SERVICE.MASTER,
    electionUserDataUsingApi: true,
    refreshData: clearRmo,
    nonRefreshData: {
      upazila: false,
      rmoOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.RMO,
    refreshData: clearMunicipality,
    nonRefreshData: {
      rmo: false,
      municipalityOptions: false,
      unionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    displayDependency: [
      {
        value: [RMO.CITY, RMO.CANTONMENT, RMO.RURAL, RMO.OTHER],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      regionId: APPLICATION_SEARCH.DIVISION,
      rmoEn: APPLICATION_SEARCH.RMO,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearInstitute,
    nonRefreshData: {
      unionOrWard: false,
      instituteOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    displayDependency: [
      {
        value: [RMO.MUNICIPALITY, RMO.CITY_CORPORATION],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    pathParamsDependency: { upazilas: APPLICATION_SEARCH.SUB_DISTRICT },
    queryParamsDependency: {
      rmoEn: APPLICATION_SEARCH.RMO,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearUnionWard,
    nonRefreshData: {
      municipality: false,
      unionOrWardOptions: false,
    },
    electionUserDataUsingApi: true,
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    displayDependency: [
      {
        value: [RMO.MUNICIPALITY, RMO.CITY_CORPORATION],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      regionId: APPLICATION_SEARCH.DIVISION,
      municipalityId: APPLICATION_SEARCH.MUNICIPALITY,
      rmoEn: APPLICATION_SEARCH.RMO,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearInstitute,
    nonRefreshData: {
      unionOrWard: false,
      instituteOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.INSTITUTE_NAME,
    queryParamsDependency: {
      zillaId: APPLICATION_SEARCH.DISTRICT,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      unionOrWardId: APPLICATION_SEARCH.UNION_OR_WARD,
    },
    displayDependency: [
      {
        value: [RMO.CITY, RMO.CANTONMENT, RMO.OTHER, RMO.RURAL],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    nonRefreshData: { institute: false },
  },
  {
    fieldName: ADVANCE_SEARCH.INSTITUTE_NAME,
    queryParamsDependency: {
      zillaId: APPLICATION_SEARCH.DISTRICT,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      municipalityId: APPLICATION_SEARCH.MUNICIPALITY,
      unionOrWardId: APPLICATION_SEARCH.UNION_OR_WARD,
    },
    displayDependency: [
      {
        value: [RMO.MUNICIPALITY, RMO.CITY_CORPORATION],
        watchId: APPLICATION_SEARCH.RMO,
      },
    ],
    nonRefreshData: { institute: false },
  },
  {
    fieldName: ADVANCE_SEARCH.DESIGNATION,
  },
];
