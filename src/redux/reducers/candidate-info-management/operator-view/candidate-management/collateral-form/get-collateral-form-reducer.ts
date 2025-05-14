import { GetCollateralFormState } from '../types/collateral-form-state';
import { CollateralFormActions } from '@actions/candidate-info-management/operator-view/candidate-management/collateral-form/collateral-form-actions';
import { GET_COLLATERAL_FORM_INFO } from '@actions/candidate-info-management/operator-view/candidate-management/collateral-form/types';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: GetCollateralFormState = {
  request: false,
};

const getCollateralFormReducer = (
  state = initialState,
  actions: CollateralFormActions,
): GetCollateralFormState => {
  switch (actions.type) {
    case GET_COLLATERAL_FORM_INFO.GET_COLLATERAL_FORM_INFO_REQUEST:
      return {
        ...getRequestingState({ data: {} }),
      };
    case GET_COLLATERAL_FORM_INFO.GET_COLLATERAL_FORM_INFO_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    case GET_COLLATERAL_FORM_INFO.GET_COLLATERAL_FORM_INFO_FAILED:
      return {
        ...getFailedState({ data: {} }),
      };
    default:
      return state;
  }
};

export default getCollateralFormReducer;
