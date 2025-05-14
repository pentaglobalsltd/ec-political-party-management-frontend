import axios from 'axios';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { ElectionCandidateTypesRes } from '@type/election-schedule/election-schedule-candidate-types';

export const getElectionCandidateTypes = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (params: {
    [key: string]: string | number;
  }): Promise<{ data: ElectionCandidateTypesRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: string, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/candidate-types`;

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(apiEndPoint);

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
