import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { UnionOrWardsTypeRes } from '@type/candidate-info-management/operator-view/union-or-wards';

export interface FetchUnionsOrWardsQueryParams {
  upazilaId?: string | number;
  rmoEn?: string;
  municipalityId?: string | number;
  constituencyId?: string | number;
}

export const fetchUnionsOrWardsNoAuth = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    queryParams: FetchUnionsOrWardsQueryParams,
  ): Promise<{ data: UnionOrWardsTypeRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_UNIONS_OR_WARDS, { ...queryParams });

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
