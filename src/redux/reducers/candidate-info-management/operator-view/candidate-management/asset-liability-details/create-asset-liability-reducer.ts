import { CreateAssetLiabilityState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';
import { AssetLiabilityDetailActions } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';
import { CREATE_ASSET_LIABILITY_DETAILS } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/types';

import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: CreateAssetLiabilityState = {
  request: false,
};

const createAssetLiabilityDetailsReducer = (
  state = initialState,
  actions: AssetLiabilityDetailActions,
): CreateAssetLiabilityState => {
  switch (actions.type) {
    case CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createAssetLiabilityDetailsReducer;
