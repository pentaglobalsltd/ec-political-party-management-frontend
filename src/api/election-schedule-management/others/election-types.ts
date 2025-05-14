import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { masterApi } from '@helpers/interceptors/master-data';

export const fetchElectionTypes = (() => {
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
        encodeQuery(URLS.GET_MASTER_ELECTION_TYPE_LIST, {
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

export const fetchElectionType = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (id: number): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(
        URLS.GET_MASTER_ELECTION_TYPE(id),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const updateElectionType = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (id: number, data: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.put(
        URLS.UPDATE_MASTER_ELECTION_TYPE(id),
        { ...data },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
