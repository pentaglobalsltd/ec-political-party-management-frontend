import axios from 'axios';
import { URLS } from '@constants/urls';

export const getAcceptanceRejectionNominationPdfApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  const url = `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
    URLS.GET_ACCEPTANCE_REJECTION_NOMINATION_PDF
  }`;

  return async ({
    token,
    electionTypeId,
    candidateTypeId,
    upazilaNameBn,
    candidateName,
  }: {
    token: string | undefined;
    electionTypeId: number;
    candidateTypeId: number;
    upazilaNameBn?: string;
    candidateName?: string;
  }): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await axios.post(
        url,
        { electionTypeId, candidateTypeId, upazilaNameBn, candidateName },
        {
          responseType: 'blob',
          headers: {
            Authorization: 'Bearer ' + token,
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
