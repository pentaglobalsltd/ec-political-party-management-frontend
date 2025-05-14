import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { GetPollingCenterSummaryProps } from '@type/center-officer-management/polling-center/polling center-summary';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';

export const getPollingPersonnelSummary = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    searchItems?: CenterOfficerManagementSearchProps,
    page?: number,
    size?: number,
  ): Promise<{ data: GetPollingCenterSummaryProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_POLLING_PERSONNEL_SUMMARY, {
      page: page as number,
      size: size as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
      pollingCenterId: searchItems?.pollingCenterId as number,
      agencyId: searchItems?.agencyId as number,
      userTypeCode: searchItems?.userTypeCode as string,
    });

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
