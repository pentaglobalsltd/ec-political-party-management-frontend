import axios from 'axios';
import { URLS } from '@constants/urls';
import { noAuthDocumentServiceApi } from '@helpers/interceptors/document-service-no-auth';
import {
  DownloadFileIdType,
  DownloadFileIdTypeRes,
} from '@type/documents/attach-file';
import { encodeQuery } from '@pentabd/ui';

export const getImage = (() => {
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

    isRequestInProcess = true;

    try {
      const response = await noAuthDocumentServiceApi.get(
        encodeQuery(
          URLS.GET_IMAGE_BASE64({
            documentId,
            fileId,
          }),
          {
            filePath: filePath as string,
            format: formatId as string,
          },
        ),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
