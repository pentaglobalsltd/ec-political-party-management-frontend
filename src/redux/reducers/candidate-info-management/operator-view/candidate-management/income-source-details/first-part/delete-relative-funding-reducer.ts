import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { DeleteRelativeFundingState } from '../../types/income-source-details/income-source-details-first-step-state';
import { IncomeSourceDetailsActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { DELETE_RELATIVE_FUNDING } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';

const initialState: DeleteRelativeFundingState = {
  request: false,
};

const deleteRelativeFundingReducer = (
  state = initialState,
  action: IncomeSourceDetailsActions,
): DeleteRelativeFundingState => {
  switch (action.type) {
    case DELETE_RELATIVE_FUNDING.DELETE_RELATIVE_FUNDING_REQUEST:
      return {
        ...getRequestingState(),
      };

    case DELETE_RELATIVE_FUNDING.DELETE_RELATIVE_FUNDING_SUCCESS:
      return {
        ...getSuccessState(),
      };

    case DELETE_RELATIVE_FUNDING.DELETE_RELATIVE_FUNDING_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default deleteRelativeFundingReducer;
