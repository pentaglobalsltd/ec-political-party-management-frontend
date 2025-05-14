import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  AttachFileTypeRes,
  DownloadFileIdType,
  DownloadFileIdTypeRes,
} from '@type/documents/attach-file';

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
    formatId,
    filePath,
  }: DownloadFileIdType): Promise<{
    data: DownloadFileIdTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.DOWNLOAD_CANDIDATE_ATTACH_FILE({
        documentId,
        fileId,
      }),
      {
        format: formatId as number,
        filePath: filePath as string,
      },
    );

    const downloadUrl = `${import.meta.env.VITE_DOCUMENT_UPLOAD_URL}${url}`;

    isRequestInProcess = true;

    try {
      const response = await axios.get(downloadUrl, {
        responseType: 'blob',
      });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
