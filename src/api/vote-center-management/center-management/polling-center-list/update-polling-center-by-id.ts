import axios from 'axios';
import { URLS } from '@constants/urls';
import {
  PollingCenterReqBodyType,
  PollingCenterResBodyType,
} from '@type/vote-center-management/create-polling-center-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

export interface UpdatePollingCenterByIdApi {
  id: string | number;
  data: PollingCenterReqBodyType;
}

export const updatePollingCenterByIdApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    id,
    data,
  }: UpdatePollingCenterByIdApi): Promise<{
    data: PollingCenterResBodyType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecPollingCenterService.put(
        URLS.UPDATE_POLLING_CENTER_BY_ID({
          id,
        }),
        { ...data },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
