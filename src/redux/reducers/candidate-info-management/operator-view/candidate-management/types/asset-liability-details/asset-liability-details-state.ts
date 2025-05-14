import { ReduxRequest } from '@reducers/types/redux-request';
import {
  CreateAssetLiabilityPropsType,
  GetAssetLiabilityPropsType,
  UpdateAssetType,
  UpdateYearlyIncomeType,
  DeleteAssetType,
  DeleteYearlyIncomeType,
} from '@type/candidate-info-management/operator-view/asset-liabilities-form/asset-liabilities-form';

export interface CreateAssetLiabilityState
  extends ReduxRequest<CreateAssetLiabilityPropsType> {}

export interface GetAssetLiabilityState
  extends ReduxRequest<GetAssetLiabilityPropsType> {}

export interface UpdateAsset extends ReduxRequest<UpdateAssetType> {}

export interface UpdateYearlyIncome
  extends ReduxRequest<UpdateYearlyIncomeType> {}

export interface DeleteAsset extends ReduxRequest<DeleteAssetType> {}

export interface DeleteYearlyIncome
  extends ReduxRequest<DeleteYearlyIncomeType> {}

export interface AssetLiabilityState {
  createAssetLiabilityDetail: CreateAssetLiabilityState;
  getAssetLiabilityDetail: GetAssetLiabilityState;
  updateAsset: UpdateAsset;
  updateYearlyIncome: UpdateYearlyIncome;
  deleteAsset: DeleteAsset;
  deleteYearlyIncome: DeleteYearlyIncome;
}
