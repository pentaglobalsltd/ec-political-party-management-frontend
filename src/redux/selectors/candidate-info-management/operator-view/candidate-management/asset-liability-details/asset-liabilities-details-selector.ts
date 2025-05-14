import { StoreType } from '@reducers/types';
import { AssetLiabilityState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';

export const getAssetLiabilityState = (state: StoreType): AssetLiabilityState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .assetLiabilityDetails;
