import axios from 'axios';

import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import {
  CandidateChildPropsType,
  CandidateChildrenType,
  CandidatePersonalInformationType,
  ChildType,
  CreateCandidateInfoPropsType,
  UpdateCandidatePropsType,
} from '@type/candidate-info-management/operator-view/candidatePersonalInformation';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const createCandidatePersonalInformation = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
    electionSettingsId,
    candidateElectionDetailsId,
  }: CreateCandidateInfoPropsType): Promise<{
    data: CandidatePersonalInformationType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_CANDIDATE_PERSONAL_INFORMATION({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
        {
          ...data,
        },
      );

      return { data: response.data.result };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getCandidatePersonalInformation = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{
    data: CandidatePersonalInformationType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_CANDIDATE_PERSONAL_INFORMATION({
          electionSettingsId,
          candidateElectionDetailsId,
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

export const getCandidateChildren = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{
    data: CandidateChildrenType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_CANDIDATE_CHILDREN({
          electionSettingsId,
          candidateElectionDetailsId,
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

export const getCandidateChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildPropsType): Promise<{
    data: ChildType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_CANDIDATE_PERSONAL_INFORMATION_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          childId,
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

export const updateCandidateChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    childId,
  }: UpdateCandidatePropsType): Promise<{ data: ChildType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_CANDIDATE_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          childId,
        }),
        { ...data },
      );

      return { data: response.data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const deleteCandidateChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildPropsType): Promise<{ data: ChildType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.delete(
        URLS.DELETE_CANDIDATE_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          childId,
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
