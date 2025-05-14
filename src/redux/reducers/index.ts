import { combineReducers } from 'redux';
import getNominationStepsReducer from './nomination-steps';

import createElectionScheduleReducer from './election-schedule-management/create-election-schedule';
import updateElectionScheduleReducer from './election-schedule-management/update-election-schedule';

import getUserProfileForElectionSettingsId from './user-profile/user-profile-election-settings-id';
import getUserProfileForSelect from './user-profile/user-profile-for-select';
import SignInReducer from './auth/sign-in-reducer';
import SignOutReducer from './auth/sign-out-reducer';
import ResetPasswordReducer from './auth/reset-password-reducer';
import UserInfoReducer from './auth/user-info-reducer';
import UpdatePasswordReducer from './auth/update-password-reducer';
import FiltersReducer from './filters/filters-reducer';

const rootReducer = combineReducers({
  auth: combineReducers({
    signIn: SignInReducer,
    signOut: SignOutReducer,
    resetPassword: ResetPasswordReducer,
    updatePassword: UpdatePasswordReducer,
    userInfo: UserInfoReducer,
  }),

  nominationSteps: getNominationStepsReducer.reducer,
  electionSchedule: combineReducers({
    createElectionSchedule: createElectionScheduleReducer.reducer,
    updateElectionSchedule: updateElectionScheduleReducer.reducer,
  }),

  userProfile: combineReducers({
    userProfileForElectionSettingsId:
      getUserProfileForElectionSettingsId.reducer,
    userProfileForSelect: getUserProfileForSelect.reducer,
  }),
  filters: FiltersReducer,
});

export default rootReducer;
