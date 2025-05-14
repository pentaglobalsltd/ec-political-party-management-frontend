import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import {
  UpdateDynamicQueryApi,
  UpdateDynamicQueryRes,
} from '@type/candidate-info-management/dynamic-report/dynamic-report-update-type';

export const updateDynamicReportApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    reportId,
    nameBn,
    nameEn,
    tag,
    queryValue,
  }: UpdateDynamicQueryApi): Promise<{ data: UpdateDynamicQueryRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.put(
        URLS.UPDATE_DYNAMIC_REPORT(reportId),
        {
          nameBn,
          nameEn,
          tag,
          queryValue,
        },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
