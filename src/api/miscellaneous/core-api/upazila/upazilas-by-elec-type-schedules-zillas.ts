import axios from 'axios';

import { URLS } from '@constants/urls';
import { UpazilasByZillasType } from '@type/upazilas-by-zillas-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getUpazilasByZillas = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionTypeId: string | number,
    electionScheduleId: string | number,
    zillaId: string | number,
  ): Promise<{ data: UpazilasByZillasType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_UPAZILAS_BY_ZILLAS(
          electionTypeId,
          electionScheduleId,
          zillaId,
        ),
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
