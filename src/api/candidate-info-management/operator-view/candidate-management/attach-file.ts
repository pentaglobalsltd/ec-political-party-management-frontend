import axios from 'axios';

import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  AttachFileType,
  CreateAttachFileProp,
} from '@type/candidate-info-management/operator-view/attach-file/attach-file';

export const createAttachFile = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateAttachFileProp): Promise<{ data: AttachFileType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_ATTACH_FILE({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
        { ...data },
      );

      return { data: response.data.result };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getAttachFile = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: AttachFileType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_ATTACH_FILE({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );

      return { data: response.data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const updateAttachFile = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (data: {
    data: AttachFileType;
  }): Promise<{ data: AttachFileType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(URLS.UPDATE_ATTACH_FILE, { ...data });

      return {
        data: response.data.result,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
