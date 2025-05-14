import { AuthActions } from '@actions/auth/auth-actions';
import { RESET_PASSWORD } from '@actions/auth/types';
import { ResetPasswordState } from '@reducers/types/auth-state';

import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';

const initialState = {
  request: false,
};

const ResetPasswordReducer = (
  state = initialState,
  action: AuthActions,
): ResetPasswordState => {
  switch (action.type) {
    case RESET_PASSWORD.RESET_PASSWORD_REQUEST:
      return {
        ...getRequestingState(),
      };

    case RESET_PASSWORD.RESET_PASSWORD_SUCCESS: {
      return {
        ...getSuccessState(),
      };
    }

    case RESET_PASSWORD.RESET_PASSWORD_FAILED:
      const { payload } = action as any;
      return {
        ...getFailedState({ data: payload }),
      };

    case RESET_PASSWORD.RESET_PASSWORD_RESTORE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};

export default ResetPasswordReducer;
