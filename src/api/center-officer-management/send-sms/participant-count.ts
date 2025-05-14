import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { ParticipantCountResType } from '@type/center-officer-management/send-sms/participant-count-types';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';

export interface FetchParticipantCount {
  electionScheduleId: number;
  userTypeCode: number;
}

export const fetchParticipantCount = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    userTypeCode,
  }: FetchParticipantCount): Promise<{ data: ParticipantCountResType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.CENTER_OFFICER_PARTICIPANT_COUNT, {
      electionScheduleId,
      userTypeCode,
    });

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
