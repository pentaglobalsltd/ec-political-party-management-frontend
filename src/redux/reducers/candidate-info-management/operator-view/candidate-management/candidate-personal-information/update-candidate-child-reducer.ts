import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { UpdateCandidateChildState } from '../types/candidate-personal-information-state';
import { CandidatePersonalInformationActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';
import { UPDATE_CANDIDATE_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/types';

const initialState: UpdateCandidateChildState = {
  request: false,
};

const updateCandidateChildReducer = (
  state = initialState,
  action: CandidatePersonalInformationActions,
): UpdateCandidateChildState => {
  switch (action.type) {
    case UPDATE_CANDIDATE_CHILD.UPDATE_CANDIDATE_CHILD_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_CANDIDATE_CHILD.UPDATE_CANDIDATE_CHILD_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case UPDATE_CANDIDATE_CHILD.UPDATE_CANDIDATE_CHILD_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default updateCandidateChildReducer;
