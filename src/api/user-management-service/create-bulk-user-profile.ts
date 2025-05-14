import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import {
  CreateBulkUserProfiles,
  BulkUserProfiles,
} from '@type/user-management/user-profile-types';

export const createBulkUserProfileApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: BulkUserProfiles,
  ): Promise<{
    data: CreateBulkUserProfiles;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.post(
        URLS.CREATE_BULK_USER_PROFILE,
        { ...data },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
