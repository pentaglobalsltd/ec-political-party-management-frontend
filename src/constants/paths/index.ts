import { CANDIDATE_INFO_MANAGEMENT_PATH } from './candidate-info-management/index';
import { CENTER_INFO_MANAGEMENT_PATH } from './center-officer-management/index';
import { VOTE_CENTER_MANAGEMENT_PATH } from './vote-center-management/index';
import { ELECTION_SCHEDULE_MANAGEMENT_PATH } from './election-schedule-management/index';
import { RESULT_MANAGEMENT_PATH } from './result-management';
import { USER_MANAGEMENT_PATH } from './user-management/index';

export const PATH = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  UPDATE_PASSWORD: '/update-password',

  /*
   *  Election Declaration Management
   */
  ...ELECTION_SCHEDULE_MANAGEMENT_PATH,

  /*
   * Vote Center Management
   */
  ...VOTE_CENTER_MANAGEMENT_PATH,

  /*
   *  Center Officer Management
   */
  ...CENTER_INFO_MANAGEMENT_PATH,

  /*
   *  Candidate Info Management
   */
  ...CANDIDATE_INFO_MANAGEMENT_PATH,

  /*
   *  User Management
   */
  ...USER_MANAGEMENT_PATH,

  /*
   * Result Management
   */
  ...RESULT_MANAGEMENT_PATH,
};
