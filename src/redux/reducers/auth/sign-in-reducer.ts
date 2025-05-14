import { AuthActions } from '@actions/auth/auth-actions';
import { SIGN_IN } from '@actions/auth/types';
import { SignInState } from '@reducers/types/auth-state';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';

const initialState = {
  request: false,
};

const SignInReducer = (
  state = initialState,
  action: AuthActions,
): SignInState => {
  switch (action.type) {
    case SIGN_IN.SIGN_IN_REQUEST:
      return {
        ...getRequestingState(),
      };

    case SIGN_IN.SIGN_IN_SUCCESS: {
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload }),
      };
    }

    case SIGN_IN.SIGN_IN_FAILED:
      const { payload } = action as any;
      return {
        ...getFailedState({ data: payload }),
      };

    case SIGN_IN.SIGN_IN_RESTORE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};

export default SignInReducer;
