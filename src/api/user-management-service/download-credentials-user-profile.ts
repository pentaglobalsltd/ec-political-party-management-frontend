import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { LS_KEYS } from '@constants/local-store';
import { URLS } from '@constants/urls';
import { getStorage } from '@utils/local-store';

export const getDownloadCredentialsApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  const downloadUrl = `${import.meta.env.VITE_EC_USER_MANAGEMENT_SERVICE}${
    URLS.GET_DOWNLOAD_CREDENTIALS
  }`;

  return async (
    userTypeCode: string,
    electionScheduleId?: number | string,
  ): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(downloadUrl, {
      electionScheduleId: electionScheduleId as number,
      userTypeCode: userTypeCode as string,
    });

    isRequestInProcess = true;
    const token = await getStorage(LS_KEYS.AUTH_TOKEN);

    try {
      const response = await axios.get(url, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
