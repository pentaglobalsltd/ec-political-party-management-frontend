import { AssetLiabilityDetailActions } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';
import { UPDATE_ASSET } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/types';
import { UpdateAsset } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';

import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: UpdateAsset = {
  request: false,
};

const updateAssetReducer = (
  state = initialState,
  action: AssetLiabilityDetailActions,
): UpdateAsset => {
  switch (action.type) {
    case UPDATE_ASSET.UPDATE_ASSET_REQUEST:
      return {
        ...getRequestingState(),
      };

    case UPDATE_ASSET.UPDATE_ASSET_SUCCESS:
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };

    case UPDATE_ASSET.UPDATE_ASSET_FAILED:
      return {
        ...getFailedState(),
      };

    default:
      return state;
  }
};

export default updateAssetReducer;
