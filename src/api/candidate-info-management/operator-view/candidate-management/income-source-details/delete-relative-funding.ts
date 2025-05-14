import axios from 'axios';

import onsApi from '@helpers/interceptors/ons';
import { URLS } from '@constants/urls';
import { RelativeFundingURLType } from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-first-part';

export const deleteRelativeFunding = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailId,
    relativeFundingId,
  }: RelativeFundingURLType): Promise<{ status: number }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.delete(
        URLS.DELETE_RELATIVE_FUNDING({
          electionSettingsId,
          candidateElectionDetailId,
          relativeFundingId,
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
