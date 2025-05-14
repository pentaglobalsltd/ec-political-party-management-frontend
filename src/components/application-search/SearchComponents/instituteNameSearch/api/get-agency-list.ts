import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { masterApi } from '@helpers/interceptors/master-data';

export const getAgencyList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    params,
    filter,
  }: {
    params: {
      [key: string]: string | number;
    };
    filter: {
      [key: string]: string | number;
    };
  }): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/agencies`;

    if (filter) {
      apiEndPoint = encodeQuery(apiEndPoint, {
        // electionSettingsId: filter?.electionSettingsId as number,
        ...filter,
      });
    }

    isRequestInProcess = true;

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
