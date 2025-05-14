import axios from 'axios';

import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import { OtherFundingURLType } from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-first-part';

export const deleteOtherFunding = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    otherFundingId,
  }: OtherFundingURLType): Promise<{ status: number }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.delete(
        URLS.DELETE_OTHER_FUNDING({
          electionSettingsId,
          candidateElectionDetailId,
          otherFundingId,
        }),
      );
      return { status: response.status };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
