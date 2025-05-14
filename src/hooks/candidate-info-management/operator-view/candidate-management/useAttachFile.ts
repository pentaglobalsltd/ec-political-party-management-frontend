import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createAttachFileRequest,
  getAttachFileRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/attach-file/attach-file-action';

import { useAppSelector } from '@helpers/redux';
import { AttachFileType } from '@type/candidate-info-management/operator-view/attach-file';
import { CreateAttachFileProp } from '@type/candidate-info-management/operator-view/attach-file/attach-file';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { AttachFileState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/attach-file-state';
import { getAttachFileState } from '@selectors/candidate-info-management/operator-view/candidate-management/attach-file-selector';

interface UseAttachFile {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  attachFile: AttachFileType;
  addAttachFile: (event: CreateAttachFileProp) => void;
}

export const useAttachFile = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseAttachFile => {
  const dispatch = useDispatch();
  const { createAttachFile, getAttachFile } =
    useAppSelector<AttachFileState>(getAttachFileState);

  const attachFile = getAttachFile?.data || {};

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      dispatch(
        getAttachFileRequest({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );
    }
  }, [candidateElectionDetailsId, dispatch, electionSettingsId]);

  const isCreateRequested = Boolean(createAttachFile.request);
  const isCreateSuccess = Boolean(createAttachFile.success);

  const addAttachFile = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateAttachFileProp) => {
    dispatch(
      createAttachFileRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      }),
    );
  };

  return {
    isCreateRequested,
    isCreateSuccess,
    attachFile,
    addAttachFile,
  };
};
