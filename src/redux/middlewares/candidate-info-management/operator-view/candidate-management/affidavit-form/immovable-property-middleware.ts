import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  ImmovablePropertyActions,
  createImmovablePropertySuccess,
  createImmovablePropertyFailed,
  getImmovablePropertySuccess,
  getImmovablePropertyFailed,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property-actions';

import {
  CREATE_IMMOVABLE_PROPERTY,
  GET_IMMOVABLE_PROPERTY,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

import {
  createImmovableProperty,
  getImmovableProperty,
} from '@api/candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property';

import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';

export const immovablePropertyMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: ImmovablePropertyActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createImmovableProperty(payload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            // dispatch(getCandidateInfoRequest());
            dispatch(createImmovablePropertySuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createImmovablePropertyFailed());
            }
          }
          break;
        }

        case GET_IMMOVABLE_PROPERTY.GET_IMMOVABLE_PROPERTY_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getImmovableProperty(payload);
            dispatch(getImmovablePropertySuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getImmovablePropertyFailed());
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
