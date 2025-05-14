
import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateCandidatePersonalInformationState } from '../types/candidate-personal-information-state';
import { CandidatePersonalInformationActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';
import { CREATE_CANDIDATE_PERSONAL_INFO } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/types';

const initialState: CreateCandidatePersonalInformationState = {
  request: false,
};

const createCandidatePersonalInformationReducer = (
  state = initialState,
  actions: CandidatePersonalInformationActions,
): CreateCandidatePersonalInformationState => {
  switch (actions.type) {
    case CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INFO_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INFO_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INFO_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createCandidatePersonalInformationReducer;
