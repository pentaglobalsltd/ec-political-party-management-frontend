import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import {
  AllPresentCaseType,
  PresentCaseType,
  PresentCaseUrlType,
  UpdatePresentCasePropsType,
} from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';

export const getAllPresentCase = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseType,
  }: any): Promise<{ data: AllPresentCaseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        encodeQuery(
          URLS.GET_ALL_PRESENT_CASE({
            electionSettingsId,
            candidateElectionDetailsId,
          }),
          { caseType: caseType },
        ),
      );

      return {
        data: response.data,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getPresentCase = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
  }: PresentCaseUrlType): Promise<{ data: PresentCaseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_PRESENT_CASE({
          electionSettingsId,
          candidateElectionDetailsId,
          caseId,
        }),
      );

      return {
        data: response.data,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const updatePresentCase = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    caseId,
  }: UpdatePresentCasePropsType): Promise<{ data: PresentCaseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_PRESENT_CASE({
          electionSettingsId,
          candidateElectionDetailsId,
          caseId,
        }),
        { ...data },
      );

      return {
        data: response.data,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const deletePresentCase = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
  }: PresentCaseUrlType): Promise<{ data: PresentCaseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.delete(
        URLS.DELETE_PRESENT_CASE({
          electionSettingsId,
          candidateElectionDetailsId,
          caseId,
        }),
      );

      return { data: response.data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
