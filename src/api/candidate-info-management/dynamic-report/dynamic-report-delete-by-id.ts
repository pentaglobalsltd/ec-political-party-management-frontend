import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { DeleteDynamicQueryRes } from '@type/candidate-info-management/dynamic-report/dynamic-report-delete-type';

export const deleteDynamicReportById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (reportId: number): Promise<{ data: DeleteDynamicQueryRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.delete(
        URLS.DELETE_DYNAMIC_REPORT_BY_ID(reportId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
