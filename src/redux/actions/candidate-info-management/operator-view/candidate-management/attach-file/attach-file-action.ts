import {
  AttachFileType,
  CreateAttachFileProp,
} from '@type/candidate-info-management/operator-view/attach-file/attach-file';
import { CREATE_ATTACH_FILE, GET_ATTACH_FILE } from './types';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const createAttachFileRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: CreateAttachFileProp) => {
  return {
    type: CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_REQUEST,
    payload: { electionSettingsId, candidateElectionDetailsId, data },
  } as const;
};

export const createAttachFileSuccess = () => {
  return {
    type: CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_SUCCESS,
  } as const;
};

export const createAttachFileFailed = () => {
  return {
    type: CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_FAILED,
  } as const;
};
export const createAttachFileInitialState = () => {
  return {
    type: CREATE_ATTACH_FILE.CREATE_ATTACH_FILE_INITIAL_STATE,
  } as const;
};
export const getAttachFileRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_ATTACH_FILE.GET_ATTACH_FILE_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getAttachFileSuccess = (data: AttachFileType) => {
  return {
    type: GET_ATTACH_FILE.GET_ATTACH_FILE_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const getAttachFileFailed = () => {
  return {
    type: GET_ATTACH_FILE.GET_ATTACH_FILE_FAILED,
  } as const;
};

export type AttachFileActions =
  | ReturnType<typeof createAttachFileRequest>
  | ReturnType<typeof createAttachFileSuccess>
  | ReturnType<typeof createAttachFileFailed>
  | ReturnType<typeof createAttachFileInitialState>
  | ReturnType<typeof getAttachFileRequest>
  | ReturnType<typeof getAttachFileSuccess>
  | ReturnType<typeof getAttachFileFailed>;
