import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateFirstPartState } from '../../../types/candidate-nomination-form/edit-new-nomination-of-candidate/first-part-state';
import { FirstPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/first-part-actions';
import { CREATE_FIRST_PART } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/types';

const initialState: CreateFirstPartState = {
  request: false,
};

const createFirstPartReducer = (
  state = initialState,
  actions: FirstPartActions,
): CreateFirstPartState => {
  switch (actions.type) {
    case CREATE_FIRST_PART.CREATE_FIRST_PART_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_FIRST_PART.CREATE_FIRST_PART_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_FIRST_PART.CREATE_FIRST_PART_FAILED:
      const { payload } = actions as any;

      return {
        ...getFailedState({ data: payload }),
      };
    case CREATE_FIRST_PART.CREATE_FIRST_PART_INITIAL_STATE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};

export default createFirstPartReducer;
