import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import { GetRoReportFiltersTypeRes } from '@type/candidate-info-management/report/get-ro-report-filters-types';

export const getRoReportFilters = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    userId: string,
  ): Promise<{ data: GetRoReportFiltersTypeRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.get(
        URLS.REPORT_USER_DETAILS({ userId }),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
