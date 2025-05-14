import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchResultByCandidates = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    candidateTypeId,
    centerId,
  }: any): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(
        URLS.GET_RESULT_BY_CANDIDATES({
          scheduleId,
          candidateTypeId,
          centerId,
        }),
      );
      const data = {
        data: response.data,
        status: response.status,
      };

      return { data };
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const createResultByCandidate = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ data }: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.post(
        URLS.CREATE_RESULT_BY_CANDIDATE({
          electionScheduleId: data?.electionScheduleId,
          candidateTypeId: data?.candidateTypeId,
          pollingCenterId: data?.pollingCenterId,
        }),
        { ...data },
      );

      return {
        data: {
          data: response.data,
          status: response.status,
        },
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
