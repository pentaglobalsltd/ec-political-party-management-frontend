import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import { GetUserProfiles } from '@type/user-management/user-profile-types';

export const getUserProfileListApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    filter,
    type,
    sortBy,
    sortOrder,
  }: {
    filter: {
      [key: string]: string | number;
    };
    type?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<{ data: GetUserProfiles }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    // add here to include it in payload
    const url = encodeQuery(URLS.GET_USER_PROFILE_LIST, {
      electionScheduleId: filter?.electionScheduleId as number,
      electionSettingsId: filter?.electionSettingsId as number,
      municipalityId: filter?.municipalityId as number,
      userTypeCode: filter?.userTypeCode as number,
      type: type as string,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
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
