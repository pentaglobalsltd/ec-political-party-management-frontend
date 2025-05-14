import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';

const clearUpazila = {
  municipality: true,
};
const clearDistrict = {
  ...clearUpazila,
  district: true,
  municipalityOptions: true,
};
export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.DIVISION,
    refreshData: clearDistrict,
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
      municipalityOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.MUNICIPALITY,
    queryParamsDependency: {
      zillaId: APPLICATION_SEARCH.DISTRICT,
    },
    apiService: API_SERVICE.MASTER,
    nonRefreshData: { municipality: false },
  },
];
