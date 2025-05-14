import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';

interface props {
  status: number;
  statusText: string;
}
export const deleteUserProfileAPI = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    userId: string | number,
  ): Promise<{
    data: props;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.delete(
        URLS.DELETE_USER_PROFILE_BY_ID(userId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
