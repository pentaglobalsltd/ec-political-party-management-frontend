import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  ThirdPartActions,
  createThirdPartFailed,
  createThirdPartSuccess,
  getThirdPartFailed,
  getThirdPartSuccess,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/third-part-actions';

import {
  CREATE_THIRD_PART,
  GET_THIRD_PART,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/types';

import {
  createCandidateNominationFormThirdPart,
  getCandidateNominationFormThirdPart,
} from '@api/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part';

import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';
// import { getCandidateInfoRequest } from '@actions/candidate-info';

export const ThirdPartMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: ThirdPartActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_THIRD_PART.CREATE_THIRD_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createCandidateNominationFormThirdPart(
              payload,
            );
            toast.success('জমা দেওয়া সফল হয়েছে!');
            dispatch(createThirdPartSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createThirdPartFailed());
            }
          }
          break;
        }

        case GET_THIRD_PART.GET_THIRD_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCandidateNominationFormThirdPart(payload);
            dispatch(getThirdPartSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getThirdPartFailed());
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
