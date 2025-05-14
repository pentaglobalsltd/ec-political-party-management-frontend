import axios from 'axios';
import { URLS } from '@constants/urls';
import { VoterTypesTypeRes } from '@type/vote-center-management/voter-type-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getVoteCenterTypesApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (): Promise<{
    data: VoterTypesTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(URLS.GET_VOTER_TYPES);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
