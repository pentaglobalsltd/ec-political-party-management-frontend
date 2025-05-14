import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateFourthPartState } from '../../../types/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part-state';
import { FourthPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/fourth-part-actions';
import { CREATE_FOURTH_PART } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/types';

const initialState: CreateFourthPartState = {
  request: false,
};

const createFourthPartReducer = (
  state = initialState,
  actions: FourthPartActions,
): CreateFourthPartState => {
  switch (actions.type) {
    case CREATE_FOURTH_PART.CREATE_FOURTH_PART_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_FOURTH_PART.CREATE_FOURTH_PART_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_FOURTH_PART.CREATE_FOURTH_PART_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_FOURTH_PART.CREATE_FOURTH_PART_INITIAL_STATE: {
      return {
        ...getInitialState(),
      };
    }
    default:
      return state;
  }
};
export default createFourthPartReducer;
