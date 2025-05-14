import axios from 'axios';
import { masterApi } from '@helpers/interceptors/master-data';
import { encodeQuery } from '@pentabd/ui';

export const apiGetMasterUnionOrWardsData = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    params: {
      [key: string]: string | number;
    },

    filter?: {
      [key: string]: string | number;
    },
  ): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/unions-or-wards`;

    if (filter) {
      apiEndPoint = encodeQuery(apiEndPoint, {
        ...filter,
      });
    }

    try {
      const response = await masterApi.get(apiEndPoint);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
