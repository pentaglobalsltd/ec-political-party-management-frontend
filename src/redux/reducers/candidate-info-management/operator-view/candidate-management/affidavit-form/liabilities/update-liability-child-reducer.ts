import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { UpdateLiabilityChildState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { UPDATE_LIABILITY_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: UpdateLiabilityChildState = {
  request: false,
};

const updateLiabilityChildReducer = (
  state = initialState,
  action: LiabilitiesActions,
): UpdateLiabilityChildState => {
  switch (action.type) {
    case UPDATE_LIABILITY_CHILD.UPDATE_LIABILITY_CHILD_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_LIABILITY_CHILD.UPDATE_LIABILITY_CHILD_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case UPDATE_LIABILITY_CHILD.UPDATE_LIABILITY_CHILD_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default updateLiabilityChildReducer;
