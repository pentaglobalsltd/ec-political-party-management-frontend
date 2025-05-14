import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { UpdateOtherFundingState } from '../../types/income-source-details/income-source-details-first-step-state';
import { IncomeSourceDetailsActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { UPDATE_OTHER_FUNDING } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';

const initialState: UpdateOtherFundingState = {
  request: false,
};

const updateOtherFundingReducer = (
  state = initialState,
  action: IncomeSourceDetailsActions,
): UpdateOtherFundingState => {
  switch (action.type) {
    case UPDATE_OTHER_FUNDING.UPDATE_OTHER_FUNDING_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_OTHER_FUNDING.UPDATE_OTHER_FUNDING_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case UPDATE_OTHER_FUNDING.UPDATE_OTHER_FUNDING_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default updateOtherFundingReducer;
