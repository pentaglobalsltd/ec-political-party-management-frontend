import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import {
  MessageSendListParams,
  MessageSendListResponse,
} from '@type/result-management/electoral-process/message-send-list/message-send-list-type';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchMessageSendList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    electionScheduleId,
    electionSettingsId,
    sheetStatus,
  }: MessageSendListParams): Promise<{
    data: MessageSendListResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_MESSAGE_SEND_LIST(electionScheduleId, electionSettingsId),
      {
        ...(page && { page: page }),
        ...(size && { size: size }),
        ...(sheetStatus && { sheetStatus: sheetStatus }),
      },
    );

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
