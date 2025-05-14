import axios from 'axios';

import { URLS } from '@constants/urls';
import { UnionOrWardsDataType } from '@type/union-or-wards-by-municipalities-zillas-type';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getUnionOrWardsByMunicipalitiesZillas = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    electionScheduleId: string | number,
    zillaId: string | number,
    municipalityId: string | number,
  ): Promise<{ data: UnionOrWardsDataType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_UNION_OR_WARDS_BY_MUNICIPALITIES_ZILLAS(
          electionScheduleId,
          zillaId,
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
