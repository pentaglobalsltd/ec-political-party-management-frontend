import axios from 'axios';

import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';

import { encodeQuery } from '@pentabd/ui';

export interface Props {
  id: number | string;
  detailsId: number | string;
  bengaliAlphabetOrder?: boolean;
}

export const candidateStatusHistory = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ id, detailsId }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_CANDIDATE_STATUS_HISTORY_LIST(id, detailsId),
      {},
    );

    isRequestInProcess = true;

    try {
      const response = await candidateManagementServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
