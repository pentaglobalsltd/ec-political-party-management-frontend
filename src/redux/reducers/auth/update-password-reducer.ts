import { AuthActions } from '@actions/auth/auth-actions';
import { UPDATE_PASSWORD } from '@actions/auth/types';
import { UpdatePasswordState } from '@reducers/types/auth-state';

import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';

const initialState = {
  request: false,
};

const UpdatePasswordReducer = (
  state = initialState,
  action: AuthActions,
): UpdatePasswordState => {
  switch (action.type) {
    case UPDATE_PASSWORD.UPDATE_PASSWORD_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_PASSWORD.UPDATE_PASSWORD_SUCCESS: {
      return {
        ...getSuccessState(),
      };
    }

    case UPDATE_PASSWORD.UPDATE_PASSWORD_FAILED:
      return {
        ...getFailedState(),
      };

    case UPDATE_PASSWORD.UPDATE_PASSWORD_RESTORE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};

export default UpdatePasswordReducer;
