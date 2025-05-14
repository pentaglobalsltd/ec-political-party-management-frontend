import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';

const clearUnionWard = {
  unionParishadWard: true,
};
export const searchStruct = ({
  electionScheduleId,
  zillaId,
  upazilaId,
}: {
  electionScheduleId?: string | number;
  zillaId?: string | number;
  upazilaId?: string | number;
}) => [
  { fieldName: ADVANCE_SEARCH.UNION, refreshData: { ...clearUnionWard } },
  {
    fieldName: ADVANCE_SEARCH.UNION_WARD,
    pathParamsDependency: {
      getDirectValue: {
        'election-schedules': electionScheduleId,
        zillas: zillaId,
        upazilas: upazilaId,
      },
      'union-or-wards': APPLICATION_SEARCH.UNION_OR_WARD,
    },
    nonRefreshData: {
      unionParishadWard: false,
    },
  },
];
