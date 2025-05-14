import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { DeleteSelfFundingState } from '../../types/income-source-details/income-source-details-first-step-state';
import { IncomeSourceDetailsActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { DELETE_SELF_FUNDING } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';

const initialState: DeleteSelfFundingState = {
  request: false,
};

const deleteSelfFundingReducer = (
  state = initialState,
  action: IncomeSourceDetailsActions,
): DeleteSelfFundingState => {
  switch (action.type) {
    case DELETE_SELF_FUNDING.DELETE_SELF_FUNDING_REQUEST:
      return {
        ...getRequestingState(),
      };

    case DELETE_SELF_FUNDING.DELETE_SELF_FUNDING_SUCCESS:
      return {
        ...getSuccessState(),
      };

    case DELETE_SELF_FUNDING.DELETE_SELF_FUNDING_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default deleteSelfFundingReducer;
