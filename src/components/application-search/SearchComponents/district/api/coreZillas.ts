import axios from 'axios';
import { ElectionSchedulesZillasRes } from '@type/election-schedule/election-schedule-zillas-type';
import { encodeQuery } from '@pentabd/ui';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getCoreElectionSchedulesZillas = (() => {
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

    filter?: {
      [key: string]: string | number;
    };
  }): Promise<{ data: ElectionSchedulesZillasRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/zillas`;

    if (filter) {
      apiEndPoint = encodeQuery(apiEndPoint, {
        ...filter,
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
