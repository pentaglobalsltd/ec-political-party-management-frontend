import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import {
  ResetPasswordPropTypes,
  ResetPasswordTypes,
} from '@type/user-management/user-profile-types';

interface Props {
  data: ResetPasswordTypes;
  userId: string | number;
}
export const apiUpdateUserPassword = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    userId,
    data,
  }: Props): Promise<{
    data: ResetPasswordPropTypes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.put(
        URLS.UPDATE_USER_RESET_PASSWORD(userId),
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
