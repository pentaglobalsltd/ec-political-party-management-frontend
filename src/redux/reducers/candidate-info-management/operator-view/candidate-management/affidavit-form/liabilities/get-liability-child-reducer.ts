import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetLiabilityChildState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { GET_LIABILITY_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: GetLiabilityChildState = {
  request: false,
};

const getLiabilityChildReducer = (
  state = initialState,
  actions: LiabilitiesActions,
): GetLiabilityChildState => {
  switch (actions.type) {
    case GET_LIABILITY_CHILD.GET_LIABILITY_CHILD_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_LIABILITY_CHILD.GET_LIABILITY_CHILD_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    case GET_LIABILITY_CHILD.GET_LIABILITY_CHILD_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default getLiabilityChildReducer;
