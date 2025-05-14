import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE, RMO } from '@components/application-search/constants';

export const allSelectedData = {
  region: false,
  regionOptions: false,
  district: false,
  districtOptions: false,
  upazila: false,
  upazilaOptions: false,
  municipality: false,
  municipalityOptions: false,
  unionOrWard: false,
  unionOrWardOptions: false,
};

const clearUnionWard = {
  unionOrWard: true,
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
    fieldName: ADVANCE_SEARCH.DIVISION,
    refreshData: clearZilla,
  },
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
    nonRefreshData: {
      unionOrWard: false,
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
    nonRefreshData: {
      unionOrWard: false,
    },
  },
];
