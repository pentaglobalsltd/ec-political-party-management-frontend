import axios from 'axios';
import { URLS } from '@constants/urls';
import { reportViewerServiceApi } from '@helpers/interceptors/report-viewer';

export interface FetchResultsParams {
  page?: number;
  size?: number;
  electionScheduleId: number | string;
  electionSettingsId: number | string;
}

export const fetchResults = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    electionSettingsId,
  }: FetchResultsParams): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = URLS.GET_RESULTS(electionScheduleId, electionSettingsId);
    isRequestInProcess = true;

    try {
      const response = await reportViewerServiceApi.get(url);

      const data = {
        data: response.data,
        status: response.status,
      };
      return { data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
