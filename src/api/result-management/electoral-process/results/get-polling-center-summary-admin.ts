import axios from 'axios';
import { URLS } from '@constants/urls';
import { PollingCenterListFilterWithUserId } from '@type/result-management/electoral-process/results/results';
import { ELECTION_INFO } from '@constants/election-info';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchPollingCenterSummaryAdmin = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    userId,
    electionTypeId,
  }: PollingCenterListFilterWithUserId): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    isRequestInProcess = true;

    const url =
      Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID
        ? URLS.POLLING_CENTER_RESULT_SUMMARY_FOR_RO_ADMIN(scheduleId, userId)
        : URLS.POLLING_CENTER_RESULT_SUMMARY_FOR_ARO_ADMIN(scheduleId, userId);
    console.log(
      url,
      Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID,
      electionTypeId,
    );

    try {
      const response = await ecRmsService.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
