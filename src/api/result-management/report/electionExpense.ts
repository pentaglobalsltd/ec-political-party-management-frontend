import { URLS } from '@constants/urls';
import axios, { CancelTokenSource } from 'axios';

let cancelTokenSource: CancelTokenSource | null = null;

export const electionExpensePdf = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;
  const url = `${import.meta.env.VITE_PDF_GENERATOR_URL}${
    URLS.GET_ELECTION_EXPENSE_DATA
  }`;

  return async (
    token: any,
    electionSettingsId?: number,
    candidateElectionDetailsId?: number,
  ): Promise<any> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    cancelTokenSource = axios.CancelToken.source();

    isRequestInProcess = true;

    try {
      const response = await axios.post(
        url,
        { electionSettingsId, candidateElectionDetailsId },
        {
          responseType: 'blob',
          cancelToken: cancelTokenSource.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
