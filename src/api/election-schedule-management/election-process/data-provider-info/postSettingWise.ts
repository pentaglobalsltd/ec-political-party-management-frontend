import axios from 'axios';
import { URLS } from '@constants/urls';
import { dataProviderApi } from '@helpers/interceptors/data-provider';

interface Props {
  settingId: string | number;
  endPoint: string;
}

export const postSettingWise = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ settingId, endPoint }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const apiEndPoint = endPoint
      ? `${URLS.SETTING_WISE_DATA_PUBLISH(settingId)}/${endPoint}`
      : `${URLS.SETTING_WISE_DATA_PUBLISH(settingId)}`;

    try {
      const response = await dataProviderApi.post(apiEndPoint, {});
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
