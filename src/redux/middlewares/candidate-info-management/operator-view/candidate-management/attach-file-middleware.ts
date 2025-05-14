import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import { StoreType } from '@reducers/types';

import { isRequestCancelled } from '@helpers/routing';
import {
  AttachFileActions,
  createAttachFileFailed,
  createAttachFileSuccess,
  getAttachFileFailed,
  getAttachFileSuccess,
} from '@actions/candidate-info-management/operator-view/candidate-management/attach-file/attach-file-action';

import {
  createAttachFile,
  getAttachFile,
} from '@api/candidate-info-management/operator-view/candidate-management/attach-file';
import {
  CREATE_ATTACH_FILE,
  GET_ATTACH_FILE,
} from '@actions/candidate-info-management/operator-view/candidate-management/attach-file/types';

export const attachFileMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: AttachFileActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_REQUEST: {
          try {
            const { payload } = action as any;

            // api function call here
            await createAttachFile(payload);
            toast.success('জমা দেওয়া সফল হয়েছে');
            // dispatch(getCandidateInfoRequest());
            dispatch(createAttachFileSuccess());
          } catch (error) {
            if (!isRequestCancelled(error)) {
              toast.error('জমা দেওয়া সফল হয়নি');
              dispatch(createAttachFileFailed());
            }
          }
          break;
        }

        case GET_ATTACH_FILE.GET_ATTACH_FILE_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getAttachFile(payload);

            dispatch(getAttachFileSuccess(data));
          } catch (error) {
            if (!isRequestCancelled) {
              dispatch(getAttachFileFailed());
            }
          }
          break;
        }
      }
      return nextAction;
    };
  };
};
