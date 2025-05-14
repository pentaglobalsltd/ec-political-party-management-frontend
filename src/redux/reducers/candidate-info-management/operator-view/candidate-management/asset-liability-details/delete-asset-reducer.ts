import { AssetLiabilityDetailActions } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';
import { DELETE_ASSET } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/types';
import { DeleteAsset } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';

import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: DeleteAsset = {
  request: false,
};

const deleteAssetReducer = (
  state = initialState,
  action: AssetLiabilityDetailActions,
): DeleteAsset => {
  switch (action.type) {
    case DELETE_ASSET.DELETE_ASSET_REQUEST:
      return {
        ...getRequestingState(),
      };

    case DELETE_ASSET.DELETE_ASSET_SUCCESS:
      return {
        ...getSuccessState(),
      };

    case DELETE_ASSET.DELETE_ASSET_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default deleteAssetReducer;
