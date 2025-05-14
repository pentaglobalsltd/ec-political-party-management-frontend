import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import {
  UserActivationStatus,
  UserActivationStatusProps,
} from '@type/user-management/user-profile-types';

interface Props {
  data: UserActivationStatus;
  userId: string | number;
}

export const apiUserActivationStatus = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    userId,
    data,
  }: Props): Promise<{
    data: UserActivationStatusProps;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.put(
        URLS.UPDATE_USER_ACTIVATION_STATUS(userId),
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
