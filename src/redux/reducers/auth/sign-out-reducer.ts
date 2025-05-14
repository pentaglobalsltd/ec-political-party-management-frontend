import { AuthActions } from '@actions/auth/auth-actions';
import { SIGN_OUT } from '@actions/auth/types';
import { SignOutState } from '@reducers/types/auth-state';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';

const initialState = {
  request: false,
};

const SignOutReducer = (
  state = initialState,
  action: AuthActions,
): SignOutState => {
  switch (action.type) {
    case SIGN_OUT.SIGN_OUT_REQUEST:
      return {
        ...getRequestingState(),
      };

    case SIGN_OUT.SIGN_OUT_SUCCESS: {
      return {
        ...getSuccessState(),
      };
    }

    case SIGN_OUT.SIGN_OUT_FAILED:
      const { payload } = action as any;
      return {
        ...getFailedState({ data: payload }),
      };

    case SIGN_OUT.SIGN_OUT_RESTORE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};

export default SignOutReducer;
