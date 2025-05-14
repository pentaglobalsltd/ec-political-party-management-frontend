import { AuthState } from './auth-state';
import { FiltersState } from './filters-state';

export interface StoreType {
  auth: AuthState;
  nominationSteps: any;
  electionSchedule: any;
  userProfile: any;
  filters: FiltersState;
}
