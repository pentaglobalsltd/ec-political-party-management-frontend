import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateIncomeSourceDetailsSecondPartDetailsState } from '../../types/income-source-details/income-source-details-second-step-state';
import { IncomeSourceDetailsSecondPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-second-part-actions';
import { CREATE_INCOME_SOURCE_DETAILS_SECOND_PART } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-second-part';

const initialState: CreateIncomeSourceDetailsSecondPartDetailsState = {
  request: false,
};

const createIncomeSourceDetailsSecondPartReducer = (
  state = initialState,
  actions: IncomeSourceDetailsSecondPartActions,
): CreateIncomeSourceDetailsSecondPartDetailsState => {
  switch (actions.type) {
    case CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_SUCCESS:
      const { payload } = actions as any;

      return {
        ...getSuccessState({ data: payload?.data }),
      };
    case CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createIncomeSourceDetailsSecondPartReducer;
