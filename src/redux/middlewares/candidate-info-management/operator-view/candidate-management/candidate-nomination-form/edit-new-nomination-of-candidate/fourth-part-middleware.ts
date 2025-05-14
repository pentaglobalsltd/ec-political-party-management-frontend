import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  FourthPartActions,
  createFourthPartSuccess,
  createFourthPartFailed,
  getFourthPartFailed,
  getFourthPartSuccess,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/fourth-part-actions';

import {
  CREATE_FOURTH_PART,
  GET_FOURTH_PART,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/types';

import {
  createCandidateNominationFormFourthPart,
  getCandidateNominationFormFourthPart,
} from '@api/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part';

import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';
// import { getCandidateInfoRequest } from '@actions/candidate-info';

export const fourthPartMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: FourthPartActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_FOURTH_PART.CREATE_FOURTH_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createCandidateNominationFormFourthPart(
              payload,
            );
            toast.success('জমা দেওয়া সফল হয়েছে!');
            // dispatch(getCandidateInfoRequest());
            dispatch(createFourthPartSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createFourthPartFailed());
            }
          }
          break;
        }
        case GET_FOURTH_PART.GET_FOURTH_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCandidateNominationFormFourthPart(
              payload,
            );
            dispatch(getFourthPartSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getFourthPartFailed());
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
