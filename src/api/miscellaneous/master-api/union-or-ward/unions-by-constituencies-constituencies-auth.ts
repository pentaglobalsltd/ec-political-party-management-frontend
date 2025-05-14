import axios from 'axios';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { encodeQuery } from '@pentabd/ui';

interface Props {
  constituencyId: number | string;
  upazilaId?: number | string;
  upazilaIds?: string;
}

export const fetchUnionsByDoubleConstituenciesAuth = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    constituencyId,
    upazilaId,
    upazilaIds,
  }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_UNION_WARDS_BY_CONSTITUENCY_UPAZILLA(constituencyId),
      {
        upazilaId: upazilaId as number,
        upazilaIds: upazilaIds as string,
      },
    );

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
