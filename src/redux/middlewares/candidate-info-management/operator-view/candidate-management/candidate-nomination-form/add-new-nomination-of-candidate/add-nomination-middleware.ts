import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';
import {
  AddNominationActions,
  newNominationFailed,
  newNominationSuccess,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/add-new-nomination-actions';
import { StoreType } from '@reducers/types';
import { isRequestCancelled } from '@helpers/routing';
import { postNewNomination } from '@api/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/add-new-nomination-of-candidate';
import { ADD_NEW_NOMINATION } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/types';

export const addNominationMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: AddNominationActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_REQUEST: {
          const { payload } = action as any;

          postNewNomination(payload)
            .then((res) => {
              dispatch(newNominationSuccess(res?.data));
              toast.success('জমা দেওয়া সফল হয়েছে!');
            })
            .catch((error) => {
              if (!isRequestCancelled(error)) {
                dispatch(newNominationFailed());
                toast.error(error.response.data.message);
              }
            });

          break;
        }
      }
      return nextAction;
    };
  };
};
