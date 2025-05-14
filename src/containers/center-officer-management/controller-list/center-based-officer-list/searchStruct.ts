import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';

const clearPollingCenter = {
  pollingCenter: true,
};
const clearUnionOrWard = {
  ...clearPollingCenter,
  unionOrWard: true,
  pollingCenterOptions: true,
};
const clearRmo = {
  ...clearUnionOrWard,
  rmo: true,
  unionOrWardOptions: true,
};
const clearUpazila = {
  ...clearRmo,
  upazila: true,
  rmoOptions: true,
};
const clearDistrict = {
  ...clearUpazila,
  district: true,
  upazilaOptions: true,
};
const clearElectionSchedule = {
  ...clearDistrict,
  electionSchedule: true,
  districtOptions: true,
};
export const searchStructAdmin = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: clearElectionSchedule,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: clearDistrict,
    nonRefreshData: {
      electionSchedule: false,
      districtOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
    },
    apiService: API_SERVICE.CORE,
    refreshData: clearUpazila,
    nonRefreshData: {
      district: false,
      upazilaOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    pathParamsDependency: {
      zillas: APPLICATION_SEARCH.DISTRICT,
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
    refreshData: clearUnionOrWard,
    nonRefreshData: {
      rmo: false,
      unionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
      rmoEn: APPLICATION_SEARCH.RMO,
    },
    apiService: API_SERVICE.MASTER,
    refreshData: clearPollingCenter,
    nonRefreshData: {
      unionOrWard: false,
      pollingCenterOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.POLLING_CENTER,
    queryParamsDependency: {
      electionScheduleId: APPLICATION_SEARCH.ELECTION_SCHEDULE,
      zillaId: APPLICATION_SEARCH.DISTRICT,
      unionOrWardIds: APPLICATION_SEARCH.UNION_OR_WARD,
    },
    nonRefreshData: {
      pollingCenter: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.CENTER_STATUS,
  },
];

export const searchStructElectionUser = ({
  electionScheduleId,
}: {
  electionScheduleId?: number;
}) => {
  return [
    {
      fieldName: ADVANCE_SEARCH.UPAZILA,
      apiService: API_SERVICE.CORE,
      refreshData: clearRmo,
    },
    {
      fieldName: ADVANCE_SEARCH.RMO,
      refreshData: clearUnionOrWard,
      nonRefreshData: {
        rmo: false,
        unionOrWardOptions: false,
      },
    },
    {
      fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
      apiService: API_SERVICE.CORE,
      pathParamsDependency: {
        upazilas: APPLICATION_SEARCH.SUB_DISTRICT,
      },
      queryParamsDependency: {
        rmoEn: APPLICATION_SEARCH.RMO,
      },
      refreshData: clearPollingCenter,
      nonRefreshData: {
        unionOrWard: false,
        pollingCenterOptions: false,
      },
    },
    {
      fieldName: ADVANCE_SEARCH.POLLING_CENTER,
      queryParamsDependency: {
        unionOrWardIds: APPLICATION_SEARCH.UNION_OR_WARD,
        getDirectValue: {
          electionScheduleId: electionScheduleId,
        },
      },
      nonRefreshData: {
        pollingCenter: false,
      },
    },
    {
      fieldName: ADVANCE_SEARCH.CENTER_STATUS,
    },
  ];
};
