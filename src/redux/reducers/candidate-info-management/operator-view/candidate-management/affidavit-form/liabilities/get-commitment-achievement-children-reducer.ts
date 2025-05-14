import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetCommitmentAchievementChildState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { GET_COMMITMENT_ACHIEVEMENT_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: GetCommitmentAchievementChildState = {
  request: false,
};

const getCommitmentAchievementChildReducer = (
  state = initialState,
  actions: LiabilitiesActions,
): GetCommitmentAchievementChildState => {
  switch (actions.type) {
    case GET_COMMITMENT_ACHIEVEMENT_CHILD.GET_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_COMMITMENT_ACHIEVEMENT_CHILD.GET_COMMITMENT_ACHIEVEMENT_CHILD_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    case GET_COMMITMENT_ACHIEVEMENT_CHILD.GET_COMMITMENT_ACHIEVEMENT_CHILD_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default getCommitmentAchievementChildReducer;
