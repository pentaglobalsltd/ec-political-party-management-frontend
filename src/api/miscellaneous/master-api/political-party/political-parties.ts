import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { PoliticalPartiesResProp } from '@type/candidate-info-management/operator-view/political-parties';

export const getPoliticalParties = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    isPolitical?: boolean,
  ): Promise<{ data: PoliticalPartiesResProp }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(
        encodeQuery(URLS.GET_POLITICAL_PARTIES, {
          isPolitical: isPolitical as boolean,
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
