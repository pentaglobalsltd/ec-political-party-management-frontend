import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import {
  BulkUserProfiles,
  GetUserProfiles,
} from '@type/user-management/user-profile-types';

export const getUserProfileListApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    searchItems: BulkUserProfiles,
    page: number,
    size: number,
    type?: string,
  ): Promise<{ data: GetUserProfiles }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    // add here to include it in payload
    const url = encodeQuery(URLS.GET_USER_PROFILE_LIST, {
      page: page.toString(),
      size: size as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
      electionSettingsId: searchItems?.electionSettingsId as string,
      municipalityId: searchItems?.municipalityId as number,
      userTypeCode: searchItems?.userTypeCode as string,
      loginId: searchItems?.loginId as string,
      type: type as string,
      sortBy: searchItems?.sortBy as string,
      sortOrder: searchItems?.sortOrder as string,
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
