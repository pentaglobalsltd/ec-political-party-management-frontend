import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';
import {
  CREATE_SECOND_PART,
  GET_SECOND_PART,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/types';
import { StoreType } from '@reducers/types';
import {
  createCandidateNominationFormSecondPart,
  getCandidateNominationFormSecondPart,
} from '@api/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part';
import { isRequestCancelled } from '@helpers/routing';

import {
  SecondPartActions,
  createSecondPartSuccess,
  createSecondPartFailed,
  getSecondPartSuccess,
  getSecondPartFailed,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/second-part-actions';

export const SecondPartMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: SecondPartActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_SECOND_PART.CREATE_SECOND_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createCandidateNominationFormSecondPart(
              payload,
            );
            dispatch(createSecondPartSuccess(data));
            toast.success('জমা দেওয়া সফল হয়েছে!');
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createSecondPartFailed(error.response.data.message));
            }
          }
          break;
        }

        case GET_SECOND_PART.GET_SECOND_PART_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCandidateNominationFormSecondPart(
              payload,
            );

            dispatch(getSecondPartSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getSecondPartFailed());
            }
          }
          break;
        }
      }
      return nextAction;
    };
  };
};
