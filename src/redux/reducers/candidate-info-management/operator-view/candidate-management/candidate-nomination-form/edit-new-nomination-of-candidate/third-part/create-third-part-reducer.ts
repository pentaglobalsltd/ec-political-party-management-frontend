import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateThirdPartState } from '../../../types/candidate-nomination-form/edit-new-nomination-of-candidate/third-part-state';
import { ThirdPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/third-part-actions';
import { CREATE_THIRD_PART } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/types';

const initialState: CreateThirdPartState = {
  request: false,
};

const createThirdPartReducer = (
  state = initialState,
  action: ThirdPartActions,
): CreateThirdPartState => {
  switch (action.type) {
    case CREATE_THIRD_PART.CREATE_THIRD_PART_REQUEST:
      return {
        ...getRequestingState(),
      };

    case CREATE_THIRD_PART.CREATE_THIRD_PART_SUCCESS: {
      return {
        ...getSuccessState(),
      };
    }

    case CREATE_THIRD_PART.CREATE_THIRD_PART_FAILED: {
      return {
        ...getFailedState(),
      };
    }

    case CREATE_THIRD_PART.CREATE_THIRD_PART_INITIAL_STATE: {
      return {
        ...getInitialState(),
      };
    }
    default:
      return state;
  }
};
export default createThirdPartReducer;
