import { USER_PROFILE_DETAILS_KEYS } from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import { ReduxRequest } from './redux-request';
import { SelectOptionArray } from '@type/selection-option-type';

export interface Filters {
  [USER_PROFILE_DETAILS_KEYS.NAME]?: string;
  [USER_PROFILE_DETAILS_KEYS.CANDIDATE_TYPES]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.ELECTION_SCHEDULES]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.ELECTION_SETTINGS]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.ELECTION_TYPES]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.REGIONS]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.UPAZILAS]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.ZILAS]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.UNION_OR_WARDS]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.MUNICIPALITIES]?: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.CONSTITUENCIES]?: SelectOptionArray[];
}

export type FiltersState = ReduxRequest<Filters>;
