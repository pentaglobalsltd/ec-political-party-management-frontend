import { AuthActions } from '@actions/auth/auth-actions';
import { USER_INFO } from '@actions/auth/types';
import { UserInfoState } from '@reducers/types/auth-state';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';

const initialState = {
  request: false,
};

const UserInfoReducer = (
  state = initialState,
  action: AuthActions,
): UserInfoState => {
  switch (action.type) {
    case USER_INFO.USER_INFO_REQUEST:
      return {
        ...getRequestingState(),
      };

    case USER_INFO.USER_INFO_SUCCESS: {
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload }),
      };
    }

    case USER_INFO.USER_INFO_FAILED:
      const { payload } = action as any;
      return {
        ...getFailedState({ data: payload }),
      };

    case USER_INFO.USER_INFO_RESTORE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};

export default UserInfoReducer;
