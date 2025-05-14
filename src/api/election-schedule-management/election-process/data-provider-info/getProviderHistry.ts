import axios from 'axios';
import { URLS } from '@constants/urls';
import { dataProviderApi } from '@helpers/interceptors/data-provider';
import { encodeQuery } from '@pentabd/ui';
import { DataProviderResponse } from '@type/election-declaration-management/election-process/data-provider-info';

interface Props {
  scheduleId: number | string;
  regionId?: number | string;
  endPoint: string;
  page: number;
  size: number;
}

export const getProviderHistry = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    regionId,
    endPoint,
    page,
    size,
  }: Props): Promise<{ data: DataProviderResponse }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await dataProviderApi.get(
        encodeQuery(URLS.DATA_PROVIDER_HISTRY(scheduleId), {
          page: 0,
          size: size,
          moduleName: endPoint,
          ...(regionId && {
            divisionCode: regionId,
          }),
        }),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
