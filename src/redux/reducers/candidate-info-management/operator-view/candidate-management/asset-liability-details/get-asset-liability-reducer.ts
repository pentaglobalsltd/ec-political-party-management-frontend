import { GetAssetLiabilityState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';
import { AssetLiabilityDetailActions } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';
import { GET_ASSET_LIABILITY_DETAILS } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/types';

import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: GetAssetLiabilityState = {
  request: false,
};

const getAssetLiabilityDetailReducer = (
  state = initialState,
  actions: AssetLiabilityDetailActions,
): GetAssetLiabilityState => {
  switch (actions.type) {
    case GET_ASSET_LIABILITY_DETAILS.GET_ASSET_LIABILITY_DETAILS_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_ASSET_LIABILITY_DETAILS.GET_ASSET_LIABILITY_DETAILS_SUCCESS: {
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    }
    case GET_ASSET_LIABILITY_DETAILS.GET_ASSET_LIABILITY_DETAILS_FAILED:
      return {
        ...getFailedState({}),
      };

    default:
      return state;
  }
};

export default getAssetLiabilityDetailReducer;
