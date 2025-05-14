import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { UpdateCommitmentAchievementChildState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { UPDATE_COMMITMENT_ACHIEVEMENT_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: UpdateCommitmentAchievementChildState = {
  request: false,
};

const updateCommitmentAchievementChildReducer = (
  state = initialState,
  action: LiabilitiesActions,
): UpdateCommitmentAchievementChildState => {
  switch (action.type) {
    case UPDATE_COMMITMENT_ACHIEVEMENT_CHILD.UPDATE_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_COMMITMENT_ACHIEVEMENT_CHILD.UPDATE_COMMITMENT_ACHIEVEMENT_CHILD_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case UPDATE_COMMITMENT_ACHIEVEMENT_CHILD.UPDATE_COMMITMENT_ACHIEVEMENT_CHILD_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};
export default updateCommitmentAchievementChildReducer;
