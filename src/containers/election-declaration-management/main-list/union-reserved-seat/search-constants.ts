import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.DIVISION,
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    apiService: API_SERVICE.MASTER,
    queryParamsDependency: {
      regionId: APPLICATION_SEARCH.DIVISION,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    apiService: API_SERVICE.MASTER,
    pathParamsDependency: {
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    apiService: API_SERVICE.MASTER,
    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
    },
  },
];

export const allSelectedData = {
  district: false,
  districtOptions: false,

  upazilaOptions: false,
  upazila: false,

  unionOrWardOptions: false,
  unionOrWard: false,
};
export const clearUnionOrWard = {
  unionOrWard: true,
};

export const clearUpazila = {
  ...clearUnionOrWard,
  upazila: true,
  unionOrWardOptions: true,
};

export const clearZilla = {
  ...clearUpazila,
  district: true,
  upazilaOptions: true,
};
