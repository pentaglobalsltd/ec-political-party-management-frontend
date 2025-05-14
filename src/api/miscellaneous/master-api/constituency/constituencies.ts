import axios from 'axios';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { encodeQuery } from '@pentabd/ui';

interface Props {
  page?: number;
  size?: number;
  zillaId?: number;
}

export const getConstituencies = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page = 0,
    size = 100,
    zillaId,
  }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(
        encodeQuery(URLS.GET_CONSTITUENCIES, {
          page,
          size,
          ...(zillaId && { zillaId }),
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
