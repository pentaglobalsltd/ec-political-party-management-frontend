import axios from 'axios';
import { URLS } from '@constants/urls';
import { ElectionTypeRes } from '@type/election-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getElectionTypesCore = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (): Promise<{ data: ElectionTypeRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_ELECTION_TYPE,
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
