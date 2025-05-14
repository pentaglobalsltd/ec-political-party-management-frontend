import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetIncomeSourceDetailsState } from '../../types/income-source-details/income-source-details-first-step-state';
import { IncomeSourceDetailsActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { GET_INCOME_SOURCE_DETAILS } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';

const initialState: GetIncomeSourceDetailsState = {
  request: false,
};

const getIncomeSourceDetailsReducer = (
  state = initialState,
  actions: IncomeSourceDetailsActions,
): GetIncomeSourceDetailsState => {
  switch (actions.type) {
    case GET_INCOME_SOURCE_DETAILS.GET_INCOME_SOURCE_DETAILS_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_INCOME_SOURCE_DETAILS.GET_INCOME_SOURCE_DETAILS_SUCCESS: {
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    }
    case GET_INCOME_SOURCE_DETAILS.GET_INCOME_SOURCE_DETAILS_FAILED:
      return {
        ...getFailedState({}),
      };

    default:
      return state;
  }
};

export default getIncomeSourceDetailsReducer;
