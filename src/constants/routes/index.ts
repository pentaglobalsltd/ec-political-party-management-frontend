import { CENTER_OFFICER_MANAGEMENT_ROUTES } from './center-officer-management/index';
import { VOTE_CENTER_MANAGEMENT_ROUTES } from './vote-center-management/index';
import { CANDIDATE_INFO_MANAGEMENT_ROUTES } from './candidate-info-management/index';
import { ELECTION_SCHEDULE_MANAGEMENT_ROUTES } from './election-schedule-management/index';
import { USER_MANAGEMENT_ROUTES } from './user-management/index';
import { RESULT_MANAGEMENT_ROUTES } from './result-management';

export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  RESET_PASSWORD: '/reset-password',
  UPDATE_PASSWORD: '/update-password',

  /*
   *  Election Declaration Management
   */
  ...ELECTION_SCHEDULE_MANAGEMENT_ROUTES,

  /*
   * Vote Center Management
   */
  ...VOTE_CENTER_MANAGEMENT_ROUTES,

  /*
   *  Center Officer Management
   */
  ...CENTER_OFFICER_MANAGEMENT_ROUTES,

  /*
   *  Candidate Info Management
   */
  ...CANDIDATE_INFO_MANAGEMENT_ROUTES,

  /*
   *  /User Management
   */
  ...USER_MANAGEMENT_ROUTES,

  /*
   *  /Result Management
   */
  ...RESULT_MANAGEMENT_ROUTES,
};
