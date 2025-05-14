import axios from 'axios';
import { URLS } from '@constants/urls';
import { MunicipalitiesBySchedulesZillasType } from '@type/municipalities-by-schedules-zillas-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getMunicipalitiesBySchedulesZillas = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionScheduleId: string | number,
    zillaId: string | number,
  ): Promise<{ data: MunicipalitiesBySchedulesZillasType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_MUNICIPALITIES_BY_SCHEDULES_ZILLAS(
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
