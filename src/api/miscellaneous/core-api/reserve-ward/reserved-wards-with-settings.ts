import axios from 'axios';
import { URLS } from '@constants/urls';

import { ReservedWardsWithSettingsResType } from '@type/reserved-wards-with-settings-type';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getReservedWardsWithSettings = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionScheduleId: string | number,
    electionSchedulesZillaId: string | number,
    municipalityId: string | number,
  ): Promise<{ data: ReservedWardsWithSettingsResType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_RESERVED_WARDS_WITH_SETTINGS(
          electionScheduleId,
          electionSchedulesZillaId,
          municipalityId,
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
