import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import { UserTypesProps } from '@type/user-types';

export const getUserTypesApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    type?: string,
    userTypeCodes?: string,
  ): Promise<{ data: UserTypesProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_USER_TYPES, {
      type: type as string,
      userTypeCodes: userTypeCodes as string,
    });

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
