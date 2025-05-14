import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { DeleteCandidateChildState } from '../types/candidate-personal-information-state';
import { CandidatePersonalInformationActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';
import { DELETE_CANDIDATE_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/types';

const initialState: DeleteCandidateChildState = {
  request: false,
};

const deleteCandidateChildReducer = (
  state = initialState,
  action: CandidatePersonalInformationActions,
): DeleteCandidateChildState => {
  switch (action.type) {
    case DELETE_CANDIDATE_CHILD.DELETE_CANDIDATE_CHILD_REQUEST:
      return {
        ...getRequestingState(),
      };

    case DELETE_CANDIDATE_CHILD.DELETE_CANDIDATE_CHILD_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case DELETE_CANDIDATE_CHILD.DELETE_CANDIDATE_CHILD_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default deleteCandidateChildReducer;
