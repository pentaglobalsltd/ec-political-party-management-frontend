import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetLiabilityChildrenState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { GET_LIABILITY_CHILDREN } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: GetLiabilityChildrenState = {
  request: false,
};

const getLiabilityChildrenReducer = (
  state = initialState,
  actions: LiabilitiesActions,
): GetLiabilityChildrenState => {
  switch (actions.type) {
    case GET_LIABILITY_CHILDREN.GET_LIABILITY_CHILDREN_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_LIABILITY_CHILDREN.GET_LIABILITY_CHILDREN_SUCCESS:
      return {
        ...getSuccessState({}),
      };
    case GET_LIABILITY_CHILDREN.GET_LIABILITY_CHILDREN_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default getLiabilityChildrenReducer;
