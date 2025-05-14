import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { DeleteCommitmentAchievementChildState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { DELETE_COMMITMENT_ACHIEVEMENT_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: DeleteCommitmentAchievementChildState = {
  request: false,
};

const deleteCommitmentAchievementChildReducer = (
  state = initialState,
  action: LiabilitiesActions,
): DeleteCommitmentAchievementChildState => {
  switch (action.type) {
    case DELETE_COMMITMENT_ACHIEVEMENT_CHILD.DELETE_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST:
      return {
        ...getRequestingState(),
      };

    case DELETE_COMMITMENT_ACHIEVEMENT_CHILD.DELETE_COMMITMENT_ACHIEVEMENT_CHILD_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case DELETE_COMMITMENT_ACHIEVEMENT_CHILD.DELETE_COMMITMENT_ACHIEVEMENT_CHILD_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default deleteCommitmentAchievementChildReducer;
