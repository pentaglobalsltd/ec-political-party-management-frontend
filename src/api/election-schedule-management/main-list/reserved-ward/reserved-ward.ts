import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import {
  ReservedWardCreateType,
  ReservedWardListResponse,
  ReservedWardTypeListParams,
} from '@type/election-declaration-management/main-list/reserved-ward/reserved-ward-types';

export const fetchReservedWardList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    code,
    municipalityId,
  }: ReservedWardTypeListParams): Promise<{
    data: ReservedWardListResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_RESERVED_WARD_LIST, {
      ...(page && { page: page }),
      ...(size && { size: size }),
      ...(code && { code: code }),
      ...(municipalityId && { municipalityId: municipalityId }),
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

export const postReservedWard = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: ReservedWardCreateType,
  ): Promise<{
    data: ReservedWardListResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.post(URLS.CREATE_RESERVED_WARD, {
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

export const fetchReservedWard = (() => {
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
      const response = await masterApi.get(URLS.GET_RESERVED_WARD(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const reservedWardUpdate = (() => {
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
      const response = await masterApi.put(URLS.UPDATE_RESERVED_WARD(id), {
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
