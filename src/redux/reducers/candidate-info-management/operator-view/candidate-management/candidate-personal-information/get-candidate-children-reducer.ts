import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetCandidateChildrenState } from '../types/candidate-personal-information-state';
import { CandidatePersonalInformationActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';
import { GET_CANDIDATE_CHILDREN } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/types';

const initialState: GetCandidateChildrenState = {
  request: false,
};

const getCandidateChildrenReducer = (
  state = initialState,
  actions: CandidatePersonalInformationActions,
): GetCandidateChildrenState => {
  switch (actions.type) {
    case GET_CANDIDATE_CHILDREN.GET_CANDIDATE_CHILDREN_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_CANDIDATE_CHILDREN.GET_CANDIDATE_CHILDREN_SUCCESS:
      return {
        ...getSuccessState({}),
      };
    case GET_CANDIDATE_CHILDREN.GET_CANDIDATE_CHILDREN_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default getCandidateChildrenReducer;
