import { IncomeSourceDetailsSecondPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-second-part-actions';
import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetIncomeSourceDetailsSecondPartDetailsState } from '../../types/income-source-details/income-source-details-second-step-state';
import { GET_INCOME_SOURCE_SECOND_PART_DETAILS } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-second-part';

const initialState: GetIncomeSourceDetailsSecondPartDetailsState = {
  request: false,
};
const getIncomeSourceDetailsSecondPartReducer = (
  state = initialState,
  actions: IncomeSourceDetailsSecondPartActions,
): GetIncomeSourceDetailsSecondPartDetailsState => {
  switch (actions.type) {
    case GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_SUCCESS: {
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    }
    case GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_FAILED:
      return {
        ...getFailedState({}),
      };
    case GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_INITIAL_STATE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};

export default getIncomeSourceDetailsSecondPartReducer;
