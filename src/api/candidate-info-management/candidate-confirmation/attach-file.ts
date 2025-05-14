import axios from 'axios';
import { URLS } from '@constants/urls';
import { noAuthDocumentServiceApi } from '@helpers/interceptors/document-service-no-auth';
import {
  AttachFileTypeRes,
  DownloadFileIdType,
} from '@type/documents/attach-file';

import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import onsApi from '@helpers/interceptors/ons';

export const getAttachFile = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{
    data: AttachFileTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_CANDIDATE_ATTACH_FILE({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const downloadAttachFile = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    documentId,
    fileId,
  }: DownloadFileIdType): Promise<{
    data: AttachFileTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthDocumentServiceApi.get(
        URLS.DOWNLOAD_CANDIDATE_ATTACH_FILE({ documentId, fileId }),
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
