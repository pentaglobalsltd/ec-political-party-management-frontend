import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { UpdateLiabilitiesState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { UPDATE_LIABILITIES } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: UpdateLiabilitiesState = {
  request: false,
};

const updateLiabilitiesReducer = (
  state = initialState,
  action: LiabilitiesActions,
): UpdateLiabilitiesState => {
  switch (action.type) {
    case UPDATE_LIABILITIES.UPDATE_LIABILITIES_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_LIABILITIES.UPDATE_LIABILITIES_SUCCESS:
      return {
        ...getSuccessState(),
      };

    case UPDATE_LIABILITIES.UPDATE_LIABILITIES_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default updateLiabilitiesReducer;
