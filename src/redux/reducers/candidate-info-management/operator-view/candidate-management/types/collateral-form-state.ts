import { ReduxRequest } from '@reducers/types/redux-request';
import {
  CollateralFormType,
  JamanatType,
} from '@type/candidate-info-management/candidate-confirmation/collateral-form';

export interface GetCollateralFormState
  extends ReduxRequest<CollateralFormType[]> {}

export interface UpdateCollateralFormState extends ReduxRequest<JamanatType> {}

export interface CollateralFormState {
  getCollateralForm: GetCollateralFormState;
  updateCollateralForm: UpdateCollateralFormState;
}
