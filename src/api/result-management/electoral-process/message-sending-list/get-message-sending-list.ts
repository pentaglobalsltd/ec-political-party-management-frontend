import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { MessageSendProps } from '@hooks/result-management/electoral-process/message-sending-list/useGetMessageSend';
import { MessageSendingListParams } from '@type/result-management/electoral-process/message-sending-list/message-sending-list-type';
import { MessageSendingListResponse } from './../../../../types/result-management/electoral-process/message-sending-list/message-sending-list-type';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchMessageSendingList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    scheduleId,
    electionSettingsId,

    sheetStatus,
  }: MessageSendingListParams): Promise<{
    data: MessageSendingListResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_MESSAGE_SENDING_LIST(scheduleId, electionSettingsId),
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

export const fetchMessageSend = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    id,
  }: MessageSendProps): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(
        URLS.GET_MESSAGE_SEND(scheduleId, id),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const updateMessageSendAPI = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: any,
    scheduleId: number | string,
    id: number | string,
  ): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.put(
        URLS.UPDATE_MESSAGE_SEND(scheduleId, id),
        data,
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const updateMessageSendFinalAPI = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    data: any,
    scheduleId: number | string,
    id: number | string,
  ): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.put(
        URLS.UPDATE_MESSAGE_SEND_FINAL(scheduleId, id),
        data,
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
