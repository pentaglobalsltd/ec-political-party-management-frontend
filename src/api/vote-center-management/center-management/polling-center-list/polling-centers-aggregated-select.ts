import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { PollingCenterPagination } from '@type/polling-center-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

interface props {
  electionScheduleId?: number | string;
  constituencyId?: number | string;
  upazilaId?: number | string;
  zillaId?: number | string;
  regionId?: number | string;
  municipalityId?: number | string;
  unionOrWardIds?: number | string;
}
export const getPollingCenterAggregated = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    zillaId,
    constituencyId,
    upazilaId,
    regionId,
    municipalityId,
    unionOrWardIds,
  }: props): Promise<{ data: PollingCenterPagination }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_POLLING_CENTER_AGGREGATED, {
      electionScheduleId: electionScheduleId as number,
      zillaId: zillaId as number,
      constituencyId: constituencyId as number,

      upazilaId: upazilaId as number,
      regionId: regionId as number,
      municipalityId: municipalityId as number,

      unionOrWardIds: unionOrWardIds as number,
    });
    isRequestInProcess = true;

    try {
      const response = await ecPollingCenterService.get(url);
      return { data: response.data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
