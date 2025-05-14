import axios from 'axios';
import { URLS } from '@constants/urls';
import { SubmitResultSummaryOpRes } from '@type/result-management/electoral-process/submit-results/submitResults';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchPollingCenterResultDashboardMetrics = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
  }: {
    electionScheduleId?: string | number;
  }): Promise<{ data: SubmitResultSummaryOpRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(
        URLS.GET_POLLING_CENTER_RESULT_DASHBOARD_METRICS({
          scheduleId: electionScheduleId,
        }),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
