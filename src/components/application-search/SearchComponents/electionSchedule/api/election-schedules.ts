import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { ElectionSchedulesRes } from '@type/election-schedule/election-schedules-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedules = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    params: { [key: string]: string | number },
    isActive: boolean = true,
  ): Promise<{ data: ElectionSchedulesRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: string, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/election-schedules`;

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        encodeQuery(apiEndPoint, {
          ...(isActive && { isActive }),
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
