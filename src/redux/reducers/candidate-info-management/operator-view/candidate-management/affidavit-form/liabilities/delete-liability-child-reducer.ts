import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { DeleteLiabilityChildState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { DELETE_LIABILITY_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: DeleteLiabilityChildState = {
  request: false,
};

const deleteLiabilityChildReducer = (
  state = initialState,
  action: LiabilitiesActions,
): DeleteLiabilityChildState => {
  switch (action.type) {
    case DELETE_LIABILITY_CHILD.DELETE_LIABILITY_CHILD_REQUEST:
      return {
        ...getRequestingState(),
      };

    case DELETE_LIABILITY_CHILD.DELETE_LIABILITY_CHILD_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case DELETE_LIABILITY_CHILD.DELETE_LIABILITY_CHILD_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default deleteLiabilityChildReducer;
