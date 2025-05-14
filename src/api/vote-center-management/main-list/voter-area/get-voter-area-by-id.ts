import axios from 'axios';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { VoterAreaGetIdResponseType } from '@type/vote-center-management/voter-area-type';

export const fetchGetVoterAreaById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id: string | number,
  ): Promise<{ data: VoterAreaGetIdResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(URLS.GET_VOTER_AREA_BY_ID(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
