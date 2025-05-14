import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateLiabilitiesState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { CREATE_LIABILITIES } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: CreateLiabilitiesState = {
  request: false,
};

const createLiabilitiesReducer = (
  state = initialState,
  actions: LiabilitiesActions,
): CreateLiabilitiesState => {
  switch (actions.type) {
    case CREATE_LIABILITIES.CREATE_LIABILITIES_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_LIABILITIES.CREATE_LIABILITIES_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_LIABILITIES.CREATE_LIABILITIES_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_LIABILITIES.CREATE_LIABILITIES_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createLiabilitiesReducer;
