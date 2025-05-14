import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import {
  CreateDynamicQueryApi,
  CreateDynamicQueryRes,
} from '@type/candidate-info-management/dynamic-report/dynamic-report-create-type';

export const createDynamicReportApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    nameBn,
    nameEn,
    tag,
    queryValue,
  }: CreateDynamicQueryApi): Promise<{ data: CreateDynamicQueryRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.post(URLS.CREATE_DYNAMIC_REPORT, {
        nameBn,
        nameEn,
        tag,
        queryValue,
      });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
