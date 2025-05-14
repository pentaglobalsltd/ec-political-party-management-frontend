import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { DeleteOtherFundingState } from '../../types/income-source-details/income-source-details-first-step-state';
import { IncomeSourceDetailsActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { DELETE_OTHER_FUNDING } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';

const initialState: DeleteOtherFundingState = {
  request: false,
};

const deleteOtherFundingReducer = (
  state = initialState,
  action: IncomeSourceDetailsActions,
): DeleteOtherFundingState => {
  switch (action.type) {
    case DELETE_OTHER_FUNDING.DELETE_OTHER_FUNDING_REQUEST:
      return {
        ...getRequestingState(),
      };

    case DELETE_OTHER_FUNDING.DELETE_OTHER_FUNDING_SUCCESS:
      return {
        ...getSuccessState(),
      };

    case DELETE_OTHER_FUNDING.DELETE_OTHER_FUNDING_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default deleteOtherFundingReducer;
