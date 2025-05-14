import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { UpazilasTypeRes } from '@type/candidate-info-management/operator-view/upazilas';

export interface FetchUpazilasNoAuth {
  zillaId?: string | number;
  municipalityId?: string | number;
  constituencyIds?: string | number;
}

export const fetchUpazilasNoAuth = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    params: FetchUpazilasNoAuth,
  ): Promise<{ data: UpazilasTypeRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_SUB_DISTRICT_LIST, {
      ...params,
    });

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
