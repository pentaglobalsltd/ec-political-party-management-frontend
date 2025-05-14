import axios from 'axios';
import { ElectionSchedulesConstituenciesRes } from '@type/election-schedule/election-schedule-constituencies-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionSchedulesCandidateTypeConstituencies = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (params: {
    [key: string]: string | number;
  }): Promise<{ data: ElectionSchedulesConstituenciesRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/constituencies`;

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
