import { AssetLiabilityDetailActions } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';
import { DELETE_YEARLY_INCOME } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/types';
import { DeleteYearlyIncome } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';

import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: DeleteYearlyIncome = {
  request: false,
};

const deleteYearlyIncomeReducer = (
  state = initialState,
  action: AssetLiabilityDetailActions,
): DeleteYearlyIncome => {
  switch (action.type) {
    case DELETE_YEARLY_INCOME.DELETE_YEARLY_INCOME_REQUEST:
      return {
        ...getRequestingState(),
      };

    case DELETE_YEARLY_INCOME.DELETE_YEARLY_INCOME_SUCCESS:
      return {
        ...getSuccessState(),
      };

    case DELETE_YEARLY_INCOME.DELETE_YEARLY_INCOME_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default deleteYearlyIncomeReducer;
