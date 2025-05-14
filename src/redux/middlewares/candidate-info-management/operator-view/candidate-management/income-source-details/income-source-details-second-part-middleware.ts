import { toast } from 'react-toastify';
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { i18n } from '@translation/i18n';
import {
  IncomeSourceDetailsSecondPartActions,
  createIncomeSourceDetailsSecondPartFailed,
  createIncomeSourceDetailsSecondPartSuccess,
  getIncomeSourceDetailsSecondPartFailed,
  getIncomeSourceDetailsSecondPartSuccess,
} from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-second-part-actions';
import {
  CREATE_INCOME_SOURCE_DETAILS_SECOND_PART,
  GET_INCOME_SOURCE_SECOND_PART_DETAILS,
} from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-second-part';
import {
  createIncomeSourceDetailsSecondPart,
  getIncomeSourceDetailsSecondPart,
} from '@api/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-second-part';
import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';
const { t } = i18n;

export const incomeSourceDetailsSecondPartMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch, getState }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: IncomeSourceDetailsSecondPartActions) => {
      const nextAction = next(action);

      switch (action.type) {
        case CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_REQUEST: {
          try {
            const { payload } = action as any;

            const { data } = await createIncomeSourceDetailsSecondPart(payload);
            toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
            // dispatch(
            //   getCandidateInfoRequest(
            //     getState().candidateInfo.data.candidateElectionDetailsId,
            //   ),
            // );  //nazia check
            dispatch(createIncomeSourceDetailsSecondPartSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(
                error?.response?.data?.message
                  ? error?.response?.data?.message
                  : t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'),
              );
              dispatch(createIncomeSourceDetailsSecondPartFailed());
            }
          }
          break;
        }

        case GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data }: any = await getIncomeSourceDetailsSecondPart(
              payload,
            );

            dispatch(getIncomeSourceDetailsSecondPartSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getIncomeSourceDetailsSecondPartFailed());
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
