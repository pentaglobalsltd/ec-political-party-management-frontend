import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateSecondPartState } from '../../../types/candidate-nomination-form/edit-new-nomination-of-candidate/second-part-state';
import { SecondPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/second-part-actions';
import { CREATE_SECOND_PART } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/types';

const initialState: CreateSecondPartState = {
  request: false,
};

const createSecondPartReducer = (
  state = initialState,
  actions: SecondPartActions,
): CreateSecondPartState => {
  switch (actions.type) {
    case CREATE_SECOND_PART.CREATE_SECOND_PART_REQUEST:
      return {
        ...getRequestingState(),
      };

    case CREATE_SECOND_PART.CREATE_SECOND_PART_SUCCESS:
      return {
        ...getSuccessState(),
      };

    case CREATE_SECOND_PART.CREATE_SECOND_PART_FAILED:
      const { payload } = actions as any;
      return {
        ...getFailedState({ data: payload }),
      };
    case CREATE_SECOND_PART.CREATE_SECOND_PART_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createSecondPartReducer;
