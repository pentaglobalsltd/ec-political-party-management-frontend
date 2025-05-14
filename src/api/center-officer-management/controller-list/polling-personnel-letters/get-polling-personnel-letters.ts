import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { GetPollingPersonnelLetterSummaryProps } from '@type/center-officer-management/polling-personnel-letters';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';

export const getPollingPersonnelLetterSummary = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    searchItems?: CenterOfficerManagementSearchProps,
    page?: number,
    size?: number,
  ): Promise<{ data: GetPollingPersonnelLetterSummaryProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_POLLING_PERSONNEL_SUMMARY_LETTERS, {
      page: page as number,
      size: size as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
      zillaId: searchItems?.zillaId as number,
      upazillaId: searchItems?.upazilaId as number,
      unionOrWardId: searchItems?.unionOrWardId as number,
      pollingCenterId: searchItems?.pollingCenterId as number,
      statusId: searchItems?.statusId as string,
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
