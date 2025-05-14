import { StoreType } from '@reducers/types';
import { CollateralFormState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/collateral-form-state';

export const getCollateralFormState = (state: StoreType): CollateralFormState =>
  state.candidateInfoManagement.operatorView.candidateManagement.collateralForm;
