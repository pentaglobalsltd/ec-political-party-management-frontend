import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { masterApi } from '@helpers/interceptors/master-data';

interface RegionParams {
  page?: number;
  size?: number;
  regionIds?: string;
}

export const getRegions = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    regionIds,
  }: RegionParams): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_REGIONS, {
      ...(page && { page: page }),
      ...(size && { size: size }),
      ...(regionIds && { regionIds: regionIds }),
    });

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const fetchRegion = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (id: string | number): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(URLS.GET_REGION(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const createNewRegion = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
  }: any): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.post(URLS.CREATE_REGION, {
        ...data,
      });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const fetchUpdateRegion = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (id: string | number, data: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.put(URLS.UPDATE_REGION(id), { ...data });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
