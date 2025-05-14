import axios from 'axios';
import { URLS } from '@constants/urls';
import { dataProviderApi } from '@helpers/interceptors/data-provider';
import { encodeQuery } from '@pentabd/ui';

interface Props {
  scheduleId: string | number;
  endPoint: string;
  regionId: string | number;
}

export const getScheduleWiseCount = (() => {
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
      ? `${URLS.SCHEDULE_WISE_DATA_PUBLISH_GET(scheduleId)}/${endPoint}/count`
      : `${URLS.SCHEDULE_WISE_DATA_PUBLISH_GET(scheduleId)}/count`;

    const apiEndPointWithQuery = encodeQuery(apiEndPoint, {
      divisionCode: regionId,
    });

    try {
      const response = await dataProviderApi.get(apiEndPointWithQuery);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
