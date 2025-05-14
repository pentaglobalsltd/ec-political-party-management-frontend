import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateAttachFileState } from '../types/attach-file-state';
import { AttachFileActions } from '@actions/candidate-info-management/operator-view/candidate-management/attach-file/attach-file-action';
import { CREATE_ATTACH_FILE } from '@actions/candidate-info-management/operator-view/candidate-management/attach-file/types';

const initialState: CreateAttachFileState = {
  request: false,
};

const createAttachFileReducer = (
  state = initialState,
  action: AttachFileActions,
): CreateAttachFileState => {
  switch (action.type) {
    case CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_REQUEST:
      return {
        ...getRequestingState(),
      };

    case CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_SUCCESS:
      return {
        ...getSuccessState(),
      };

    case CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createAttachFileReducer;
