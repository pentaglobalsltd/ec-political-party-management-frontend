import axios from 'axios';
import { URLS } from '@constants/urls';
import { MessageSendListStatusResponseType } from '@type/message-send-list-status-types';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchMessageSendListStatuses = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (): Promise<{ data: MessageSendListStatusResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(
        URLS.GET_MESSAGE_SEND_LIST_STATUSES,
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
