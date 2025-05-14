import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { toast } from 'react-toastify';

import {
  getCollateralForm,
  updateCollateralForm,
} from '@api/candidate-info-management/candidate-confirmation/collateral-form';
import {
  GET_COLLATERAL_FORM_INFO,
  UPDATE_COLLATERAL_FORM_INFO,
} from '@actions/candidate-info-management/operator-view/candidate-management/collateral-form/types';
import {
  CollateralFormActions,
  getCollateralFormInfoFailed,
  getCollateralFormInfoSuccess,
  updateCollateralFormInfoSuccess,
  updateCollateralFormInfoFailed,
} from '@actions/candidate-info-management/operator-view/candidate-management/collateral-form/collateral-form-actions';
import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';

import { i18n } from '@translation/i18n';
const { t } = i18n;

export const collateralFormMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch, getState }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: CollateralFormActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case GET_COLLATERAL_FORM_INFO.GET_COLLATERAL_FORM_INFO_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCollateralForm(payload);
            dispatch(getCollateralFormInfoSuccess(data as any));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getCollateralFormInfoFailed());
            }
          }
          break;
        }

        case UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await updateCollateralForm(payload);
            toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
            dispatch(updateCollateralFormInfoSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(
                error.response.data.message
                  ? error.response.data.message
                  : t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'),
              );
              dispatch(updateCollateralFormInfoFailed());
            }
          }
          break;
        }

        default:
          break;
      }
      return nextAction;
    };
  };
};
