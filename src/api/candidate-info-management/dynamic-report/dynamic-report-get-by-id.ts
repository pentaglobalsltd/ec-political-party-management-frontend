import axios from 'axios';
import { URLS } from '@constants/urls';
import { DynamicReportGetByIdTypeRes } from '@type/candidate-info-management/dynamic-report/dynamic-report-get-by-id-type';
import { masterApi } from '@helpers/interceptors/master-data';

export const getDynamicReportById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    reportId: string,
  ): Promise<{
    data: DynamicReportGetByIdTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(
        URLS.GET_DYNAMIC_REPORT_BY_ID(reportId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
