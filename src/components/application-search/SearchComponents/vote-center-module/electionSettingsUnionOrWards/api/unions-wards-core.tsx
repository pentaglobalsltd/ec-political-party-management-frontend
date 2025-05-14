import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const apiGetCoreUnionsOrWards = (() => {
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
  ): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/union-or-wards`;

    if (filter) {
      apiEndPoint = encodeQuery(apiEndPoint, {
        electionSettingsId: filter?.electionSettingsId as number,
      });
    }
    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(apiEndPoint);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
