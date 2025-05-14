import axios from 'axios';
import { URLS } from '@constants/urls';
import { reportViewerServiceApi } from '@helpers/interceptors/report-viewer';

import { CandidatePaymentResponse } from '@type/candidate-info-management/candidate-nomination-payment-table-types';

interface Props {
  electionTypeId: number | string;
  scheduleId: number | string;
}

export const getCandidatePaymentTable = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionTypeId,
    scheduleId,
  }: Props): Promise<{ data: CandidatePaymentResponse }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;
    try {
      const response = await reportViewerServiceApi.get(
        URLS.GET_CANDIDATE_PAYMENT_TABLE({
          electionTypeId,
          scheduleId,
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
