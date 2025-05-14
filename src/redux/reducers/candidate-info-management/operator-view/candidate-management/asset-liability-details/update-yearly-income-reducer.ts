import { AssetLiabilityDetailActions } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';
import { UPDATE_YEARLY_INCOME } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/types';
import { UpdateYearlyIncome } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';

import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: UpdateYearlyIncome = {
  request: false,
};

const updateYearlyIncomeReducer = (
  state = initialState,
  action: AssetLiabilityDetailActions,
): UpdateYearlyIncome => {
  switch (action.type) {
    case UPDATE_YEARLY_INCOME.UPDATE_YEARLY_INCOME_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_YEARLY_INCOME.UPDATE_YEARLY_INCOME_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case UPDATE_YEARLY_INCOME.UPDATE_YEARLY_INCOME_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default updateYearlyIncomeReducer;
