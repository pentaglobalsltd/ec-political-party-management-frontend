import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { UpdateRelativeFundingState } from '../../types/income-source-details/income-source-details-first-step-state';
import { IncomeSourceDetailsActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { UPDATE_RELATIVE_FUNDING } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';

const initialState: UpdateRelativeFundingState = {
  request: false,
};

const updateRelativeFundingReducer = (
  state = initialState,
  action: IncomeSourceDetailsActions,
): UpdateRelativeFundingState => {
  switch (action.type) {
    case UPDATE_RELATIVE_FUNDING.UPDATE_RELATIVE_FUNDING_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_RELATIVE_FUNDING.UPDATE_RELATIVE_FUNDING_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case UPDATE_RELATIVE_FUNDING.UPDATE_RELATIVE_FUNDING_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default updateRelativeFundingReducer;
