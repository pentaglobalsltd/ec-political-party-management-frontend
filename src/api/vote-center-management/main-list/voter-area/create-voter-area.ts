import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import {
  VoterAreaGetIdResponseType,
  VoterAreaType,
} from '@type/vote-center-management/voter-area-type';

export const fetchCreateVoterArea = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: VoterAreaType,
  ): Promise<{ data: VoterAreaGetIdResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.post(URLS.CREATE_VOTER_AREA, {
        ...data,
      });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
