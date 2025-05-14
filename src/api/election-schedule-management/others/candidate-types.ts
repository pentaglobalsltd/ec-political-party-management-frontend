import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { masterApi } from '@helpers/interceptors/master-data';

export const fetchCandidateTypeList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
  }: {
    page?: number;
    size?: number;
  }): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(
        encodeQuery(URLS.GET_MASTER_CANDIDATE_TYPE_LIST, {
          page: page as number,
          size: size as number,
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

export const fetchAllCandidateTypeList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(URLS.GET_MASTER_CANDIDATE_TYPE_LIST);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
