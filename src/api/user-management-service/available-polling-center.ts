import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

interface props {
  id: number | string;
  userId?: string;
  unionOrWardIds?: string[] | string;
  userTypeCode?: string;
  appendSelected?: boolean;
}
export const getAvailablePollingCenters = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    id,
    userId,
    unionOrWardIds,
    userTypeCode,
    appendSelected,
  }: props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_AVAILABLE_POLLING_CENTERS(id), {
      userId: userId as string,
      unionOrWardIds: unionOrWardIds as string,
      userTypeCode: userTypeCode as string,
      appendSelected: appendSelected as boolean,
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
