import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  MovablePropertyActions,
  createMovablePropertySuccess,
  createMovablePropertyFailed,
  getMovablePropertySuccess,
  getMovablePropertyFailed,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property-actions';

import {
  CREATE_MOVABLE_PROPERTY,
  GET_MOVABLE_PROPERTY,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

import {
  createMovableProperty,
  getMovableProperty,
} from '@api/candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property';

import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';
// import { getCandidateInfoRequest } from '@actions/candidate-info';

export const movablePropertyMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: MovablePropertyActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createMovableProperty(payload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            dispatch(createMovablePropertySuccess(data));
            // dispatch(getCandidateInfoRequest());
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createMovablePropertyFailed());
            }
          }
          break;
        }

        case GET_MOVABLE_PROPERTY.GET_MOVABLE_PROPERTY_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getMovableProperty(payload);

            dispatch(getMovablePropertySuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getMovablePropertyFailed());
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
