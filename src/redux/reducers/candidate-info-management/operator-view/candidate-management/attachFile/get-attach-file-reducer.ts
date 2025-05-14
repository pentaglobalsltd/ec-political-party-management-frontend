import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetAttachFileState } from '../types/attach-file-state';
import { AttachFileActions } from '@actions/candidate-info-management/operator-view/candidate-management/attach-file/attach-file-action';
import { GET_ATTACH_FILE } from '@actions/candidate-info-management/operator-view/candidate-management/attach-file/types';

const initialState: GetAttachFileState = {
  request: false,
};

const getAttachFileReducer = (
  state = initialState,
  action: AttachFileActions,
): GetAttachFileState => {
  switch (action.type) {
    case GET_ATTACH_FILE.GET_ATTACH_FILE_REQUEST:
      return {
        ...getRequestingState({ data: [] }),
      };

    case GET_ATTACH_FILE.GET_ATTACH_FILE_SUCCESS:
      const { payload } = action as any;

      return {
        ...getSuccessState({ data: payload.data }),
      };

    case GET_ATTACH_FILE.GET_ATTACH_FILE_FAILED:
      return {
        ...getFailedState({ data: [] }),
      };

    default:
      return state;
  }
};

export default getAttachFileReducer;
