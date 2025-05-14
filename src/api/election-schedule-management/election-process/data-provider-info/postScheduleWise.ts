import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { dataProviderApi } from '@helpers/interceptors/data-provider';

interface Props {
  scheduleId: string | number;
  endPoint: string;
  regionId: string | number;
}

export const postScheduleWise = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    endPoint,
    regionId,
  }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const apiEndPoint = endPoint
      ? `${URLS.SCHEDULE_WISE_DATA_PUBLISH(scheduleId)}/${endPoint}`
      : `${URLS.SCHEDULE_WISE_DATA_PUBLISH(scheduleId)}`;

    const apiEndPointWithQuery = encodeQuery(apiEndPoint, {
      divisionCode: regionId,
    });

    try {
      const response = await dataProviderApi.post(apiEndPointWithQuery, {});
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
