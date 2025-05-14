import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';

export const fetchOperatorsByARO = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    userId: number | string,
  ): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.get(
        URLS.GET_OPERATORS_BY_ARO_USER_ID(userId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
