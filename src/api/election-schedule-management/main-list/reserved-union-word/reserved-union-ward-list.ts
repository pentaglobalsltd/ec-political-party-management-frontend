import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { encodeQuery } from '@pentabd/ui';
import axios from 'axios';

interface Props {
  municipality: number | string;
  page?: number;
  size?: number;
}

export const fetchReservedUnionWardList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    municipality,
    page,
    size,
  }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(
        encodeQuery(URLS.GET_RESERVED_UNION_WARD(municipality), {
          ...{ page: 0 },
          ...{ size: 1000 },
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
