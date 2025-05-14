import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import { ReeditNominationPermission } from '@type/user-management/user-profile-types';

export const postApiRedditNominationPermission = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: ReeditNominationPermission,
  ): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.post(
        URLS.REDDIT_NOMINATION_PERMISSION,
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
