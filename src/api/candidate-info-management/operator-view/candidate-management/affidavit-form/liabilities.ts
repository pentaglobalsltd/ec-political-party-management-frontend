import axios from 'axios';
import { URLS } from '@constants/urls';
import onsApi from '@helpers/interceptors/ons';
import {
  CommitmentAchievementChildPropsType,
  CommitmentAchievementChildrenType,
  LiabilitiesType,
  LiabilityChildPropsType,
  LiabilityChildType,
  LiabilityChildrenType,
  UpdateCommitmentAchievementChildPropsType,
  UpdateLiabilityChildPropsType,
  CommitmentAchievementChildType,
  CreateLiabilitiesPropsType,
} from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';

import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const createLiabilities = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;
  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateLiabilitiesPropsType): Promise<{ data: LiabilitiesType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.post(
        URLS.CREATE_AFFIDAVIT_LIABILITIES({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
        { ...data },
      );

      return {
        data: response.data.result,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getLiabilities = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{ data: LiabilitiesType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_LIABILITIES({
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

export const updateLiabilities = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (data: {
    data: LiabilitiesType;
  }): Promise<{ data: LiabilitiesType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(URLS.UPDATE_AFFIDAVIT_LIABILITIES, {
        ...data,
      });

      return { data: response.data.result };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getLiabilityChildren = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{
    data: LiabilityChildrenType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_LIABILITY_CHILDREN({
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

export const getLiabilityChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType): Promise<{
    data: LiabilityChildType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_LIABILITY_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          liabilityId,
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

export const updateLiabilityChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    liabilityId,
  }: UpdateLiabilityChildPropsType): Promise<{ data: LiabilityChildType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_AFFIDAVIT_LIABILITY_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          liabilityId,
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

export const deleteLiabilityChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType): Promise<{ data: LiabilityChildType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.delete(
        URLS.DELETE_AFFIDAVIT_LIABILITY_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          liabilityId,
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

export const getCommitmentAchievementChildren = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes): Promise<{
    data: CommitmentAchievementChildrenType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_COMMITMENT_ACHIEVEMENT_CHILDREN({
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

export const getCommitmentAchievementChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType): Promise<{
    data: CommitmentAchievementChildType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.get(
        URLS.GET_AFFIDAVIT_COMMITMENT_ACHIEVEMENT_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          commitmentAchievementId,
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

export const updateCommitmentAchievementChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    commitmentAchievementId,
  }: UpdateCommitmentAchievementChildPropsType): Promise<{
    data: CommitmentAchievementChildType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.put(
        URLS.UPDATE_AFFIDAVIT_COMMITMENT_ACHIEVEMENT_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          commitmentAchievementId,
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

export const deleteCommitmentAchievementChild = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType): Promise<{
    data: CommitmentAchievementChildType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsApi.delete(
        URLS.DELETE_AFFIDAVIT_COMMITMENT_ACHIEVEMENT_CHILD({
          electionSettingsId,
          candidateElectionDetailsId,
          commitmentAchievementId,
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
