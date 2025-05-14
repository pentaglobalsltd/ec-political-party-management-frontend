import { UpdateCollateralFormState } from '../types/collateral-form-state';
import { CollateralFormActions } from '@actions/candidate-info-management/operator-view/candidate-management/collateral-form/collateral-form-actions';
import { UPDATE_COLLATERAL_FORM_INFO } from '@actions/candidate-info-management/operator-view/candidate-management/collateral-form/types';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: UpdateCollateralFormState = {
  request: false,
};

const updateCollateralFormReducer = (
  state = initialState,
  actions: CollateralFormActions,
): UpdateCollateralFormState => {
  switch (actions.type) {
    case UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_REQUEST:
      return {
        ...getRequestingState(),
      };
    case UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_FAILED:
      return {
        ...getFailedState(),
      };
    case UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default updateCollateralFormReducer;
