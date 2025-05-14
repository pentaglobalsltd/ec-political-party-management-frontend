import axios from 'axios';
import { URLS } from '@constants/urls';
import { AcknowledgementPdfType } from '@type/reports/reports-types';

export const getAcknowledgementReceiptApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  const downloadUrl = `${import.meta.env.VITE_PDF_GENERATOR_URL}${
    URLS.GET_PDF_DATA
  }${URLS.GET_ACKNOWLEDGEMENT_RECEIPT}`;

  return async ({
    electionSettingsId,
    electionDetailsId,
    serialNo,
    proposedBy,
    proposedDate,
    proposedTime,
    roSelectedDate,
    roSelectedTime,
    roSelectedPlace,
    token,
  }: AcknowledgementPdfType): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await axios.post(
        downloadUrl,
        {
          electionSettingsId,
          electionDetailsId,
          serialNo,
          proposedBy,
          proposedDate,
          proposedTime,
          roSelectedDate,
          roSelectedTime,
          roSelectedPlace,
        },
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
