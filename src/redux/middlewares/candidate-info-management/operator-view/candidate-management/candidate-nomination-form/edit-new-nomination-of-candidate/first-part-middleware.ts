import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  FirstPartActions,
  createFirstPartSuccess,
  createFirstPartFailed,
  getFirstPartSuccess,
  getFirstPartFailed,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/first-part-actions';

import {
  CREATE_FIRST_PART,
  GET_FIRST_PART,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/types';

import {
  createCandidateNominationFormFirstPart,
  getCandidateNominationFormFirstPart,
} from '@api/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part';

import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';

export const firstPartMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: FirstPartActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_FIRST_PART.CREATE_FIRST_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createCandidateNominationFormFirstPart(
              payload,
            );
            dispatch(createFirstPartSuccess(data));
            toast.success('জমা দেওয়া সফল হয়েছে!');
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createFirstPartFailed(error.response.data.message));
            }
          }
          break;
        }
        case GET_FIRST_PART.GET_FIRST_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCandidateNominationFormFirstPart(payload);
            dispatch(getFirstPartSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getFirstPartFailed());
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
