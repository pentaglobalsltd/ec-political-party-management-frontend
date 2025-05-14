import axios from 'axios';
import { URLS } from '@constants/urls';
import { PollingCenterListResponseForARO } from '@type/result-management/electoral-process/polling-center-list/polling-center-list-type';
import {
  CandidateVoteCounts,
  PostalBallotCenterTypeRes,
} from '@type/result-management/electoral-process/postal-ballot/postal-ballot-type';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export interface GetPostalBallotCenterInfo {
  scheduleId: number | string;
  settingsId: number | string;
}

export interface PostPostalBallotCenterInfo {
  scheduleId: number | string;
  settingsId: number | string;
  data: {
    candidateVoteCounts: CandidateVoteCounts[];
    fileFromRo?: any;
  };
}

export const getPostalBallotCenterInfoApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    settingsId,
  }: GetPostalBallotCenterInfo): Promise<{
    data: PollingCenterListResponseForARO;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(
        URLS.GET_POSTAL_BALLOT_CENTER_INFO({
          electionScheduleId: scheduleId,
          electionSettingsId: settingsId,
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

export const postPostalBallotCenterInfoApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    settingsId,
    data,
  }: PostPostalBallotCenterInfo): Promise<{
    data: PostalBallotCenterTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.post(
        URLS.POST_POSTAL_BALLOT_CENTER_INFO({
          electionScheduleId: scheduleId,
          electionSettingsId: settingsId,
        }),
        { ...data },
      );
      return {
        data: {
          data: response?.data,
          status: response?.status,
        },
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
