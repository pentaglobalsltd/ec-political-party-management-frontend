import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { ADVANCE_SEARCH } from '@components/application-search/SearchComponents';

export const allSelectedData = {
  region: false,
  regionOptions: false,
  district: false,
  districtOptions: false,
  upazila: false,
  upazilaOptions: false,
  unionOrWard: false,
  unionOrWardOptions: false,
  rmo: false,
  rmoOptions: false,
  electionType: false,
  electionTypeOptions: false,
  toDate: false,
  fromDate: false,
};
const clearUnionWard = {
  unionOrWard: true,
};
const clearUpazila = {
  ...clearUnionWard,
  upazila: true,
  unionOrWardOptions: true,
};
const clearZilla = {
  ...clearUpazila,
  district: true,
  upazilaOptions: true,
};

export const searchStruct = ({
  isMonthlyView,
  isListView,
  isYearlyView,
}: {
  isMonthlyView: boolean;
  isListView: boolean;
  isYearlyView: boolean;
}) => [
  {
    fieldName: ADVANCE_SEARCH.DIVISION,
    refreshData: clearZilla,
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    apiService: 'master',
    pathParamsDependency: {
      regions: APPLICATION_SEARCH.DIVISION,
    },
    refreshData: clearUpazila,
    nonRefreshData: { district: false, upazilaOptions: false },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    apiService: 'master',
    queryParamsDependency: {
      zillaId: APPLICATION_SEARCH.DISTRICT,
    },
    refreshData: { ...clearUnionWard, rmo: true, unionOrWardOptions: true },
    nonRefreshData: { upazila: false },
  },
  {
    fieldName: ADVANCE_SEARCH.RMO,
    refreshData: { ...clearUnionWard },
    nonRefreshData: { rmo: false, unionOrWardOptions: false },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    apiService: 'master',
    queryParamsDependency: {
      rmoEn: APPLICATION_SEARCH.RMO,
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    nonRefreshData: { unionOrWard: false },
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: 'master',
  },
  ...(isListView
    ? [
        {
          fieldName: ADVANCE_SEARCH.DATE_FROM,
        },
      ]
    : []),

  ...(isListView
    ? [
        {
          fieldName: ADVANCE_SEARCH.DATE_TO,
        },
      ]
    : []),
  ...(isYearlyView || isMonthlyView
    ? [
        {
          fieldName: ADVANCE_SEARCH.YEAR,
        },
      ]
    : []),
  ...(isMonthlyView
    ? [
        {
          fieldName: ADVANCE_SEARCH.MONTH,
        },
      ]
    : []),
];
