import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getRegionConstituencies = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionTypeId,
    candidateTypeId,
    regionId,
    electionScheduleId,
  }: {
    electionTypeId: number | string;
    candidateTypeId: number | string;
    regionId?: number | string;
    electionScheduleId: number | string;
  }): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_REGION_CONSTITUENCIES(electionTypeId, candidateTypeId),
      {
        regionId: regionId as string,
        scheduleId: electionScheduleId as string,
      },
    );

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(url);

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
