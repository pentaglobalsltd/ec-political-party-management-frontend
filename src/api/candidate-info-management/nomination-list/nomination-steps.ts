import axios from 'axios';
import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';
import { NominationStepsResponseTypes } from '@type/nomination-status/nomination-steps-types';

export const getNominationSteps = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (): Promise<{ data: NominationStepsResponseTypes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await candidateManagementServiceApi.get(
        URLS.GET_NOMINATION_STEPS,
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
