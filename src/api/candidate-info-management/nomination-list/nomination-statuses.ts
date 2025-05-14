import axios from 'axios';
import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';
import { NominationStatusesTypeRes } from '@type/nomination-status/nomination-statuses-types';
import { encodeQuery } from '@pentabd/ui';

export const getNominationStatuses = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    isActive?: boolean,
  ): Promise<{ data: NominationStatusesTypeRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await candidateManagementServiceApi.get(
        encodeQuery(URLS.GET_NOMINATION_STATUSES, {
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
