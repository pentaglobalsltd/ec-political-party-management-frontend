import { AddNominationActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/add-new-nomination-actions';
import { ADD_NEW_NOMINATION } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/types';

import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { AddNominationState } from '../../types/candidate-nomination-form/add-new-nomination-of-candidate/add-nomination-state';

const initialState = {
  request: false,
};

const AddNominationReducer = (
  state = initialState,
  action: AddNominationActions,
): AddNominationState => {
  switch (action.type) {
    case ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_REQUEST:
      return {
        ...getRequestingState(),
      };

    case ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_SUCCESS: {
      const { payload } = action as any;

      return {
        ...getSuccessState({ data: payload.data }),
      };
    }

    case ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_FAILED:
      const { payload } = action as any;
      return {
        ...getFailedState({ data: payload }),
      };

    case ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_RESTORE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};

export default AddNominationReducer;
