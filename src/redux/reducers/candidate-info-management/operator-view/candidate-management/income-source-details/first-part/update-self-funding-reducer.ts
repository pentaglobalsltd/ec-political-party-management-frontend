import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { UpdateSelfFundingState } from '../../types/income-source-details/income-source-details-first-step-state';
import { IncomeSourceDetailsActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { UPDATE_SELF_FUNDING } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';

const initialState: UpdateSelfFundingState = {
  request: false,
};

const updateSelfFundingReducer = (
  state = initialState,
  action: IncomeSourceDetailsActions,
): UpdateSelfFundingState => {
  switch (action.type) {
    case UPDATE_SELF_FUNDING.UPDATE_SELF_FUNDING_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_SELF_FUNDING.UPDATE_SELF_FUNDING_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case UPDATE_SELF_FUNDING.UPDATE_SELF_FUNDING_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default updateSelfFundingReducer;
