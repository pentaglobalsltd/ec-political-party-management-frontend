import axios from 'axios';

import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';

import { ElectionApplicantResponseTypes } from '@type/candidate-info-management/election-applicant-types';

export const updateElectionApplicant = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: any): Promise<{
    data: ElectionApplicantResponseTypes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await candidateManagementServiceApi.put(
        URLS.UPDATE_ELECTION_APPLICANT({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
        { ...data },
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const updateElectionApplicantAllocatedSymbol = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: any): Promise<{
    data: ElectionApplicantResponseTypes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;
    // return coreServiceApi

    try {
      const response = await candidateManagementServiceApi.put(
        URLS.UPDATE_ELECTION_APPLICANT_ALLOCATED_SYMBOL({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
        { ...data },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
