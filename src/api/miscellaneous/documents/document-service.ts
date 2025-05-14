import axios from 'axios';
import { URLS } from '@constants/urls';
import { DocumentServiceTypeResponse } from '@type/documents/document-service-type';
import { documentServiceApi } from '@helpers/interceptors/document-service';

const privateUrl =
  import.meta.env.VITE_DOCUMENT_UPLOAD_URL + URLS.CREATE_DOCUMENT_SERVICE;

const publicUrl =
  import.meta.env.VITE_DOCUMENT_UPLOAD_URL +
  URLS.CREATE_PUBLIC_DOCUMENT_SERVICE;

export const createDocumentService = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    document: File,
    onUploadProgress: any,
    usePublicUrl: boolean,
    pathId?: string | number,
    category?: string,
  ): Promise<{ data: DocumentServiceTypeResponse }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const config = {
      onUploadProgress,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    isRequestInProcess = true;
    const formData = new FormData();
    formData.append('file', document);
    formData.append('docType', '1');
    pathId && formData.append('pathId', pathId.toString());
    category && formData.append('category', category);
    let url = privateUrl;
    if (usePublicUrl) {
      url = publicUrl;
    }

    try {
      const response = await documentServiceApi.post(url, formData, config);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
