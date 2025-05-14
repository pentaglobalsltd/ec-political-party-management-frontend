import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import { CreateUserProfilesTypes } from '@type/user-management/user-profile-types';

export const apiGetUserProfileById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    userId: number | string,
  ): Promise<{
    data: CreateUserProfilesTypes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.get(
        URLS.GET_USER_PROFILE_BY_ID(userId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
