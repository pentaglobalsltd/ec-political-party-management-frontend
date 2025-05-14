import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { PollingCenterPaginationProps } from '@type/polling-center-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

interface props {
  electionScheduleId?: number | string;
  constituencyId?: number | string;
  zillaId?: number | string;
  upazilaId?: number | string;
  municipalityId?: number | string;
  unionOrWardIds?: number | string;
}
export const getPollingCenters = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    zillaId,
    upazilaId,
    constituencyId,
    municipalityId,
    unionOrWardIds,
  }: props): Promise<{ data: PollingCenterPaginationProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_POLLING_CENTERS_LIST, {
      electionScheduleId: electionScheduleId as number,
      zillaId: zillaId as number,
      upazilaId: upazilaId as number,
      constituencyId: constituencyId as number,
      municipalityId: municipalityId as number,
      unionOrWardIds: unionOrWardIds as number,
    });

    isRequestInProcess = true;

    try {
      const response = await ecPollingCenterService.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
