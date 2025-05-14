import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateIncomeSourceDetailsState } from '../../types/income-source-details/income-source-details-first-step-state';
import { IncomeSourceDetailsActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { CREATE_INCOME_SOURCE_DETAILS } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';

const initialState: CreateIncomeSourceDetailsState = {
  request: false,
};

const createIncomeSourceDetailsReducer = (
  state = initialState,
  actions: IncomeSourceDetailsActions,
): CreateIncomeSourceDetailsState => {
  switch (actions.type) {
    case CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createIncomeSourceDetailsReducer;
