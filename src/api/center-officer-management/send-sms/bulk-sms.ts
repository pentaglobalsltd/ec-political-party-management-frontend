import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { BulkSMSResType } from '@type/center-officer-management/send-sms/bulk-sms-types';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';

export interface PostCenterOfficerBulkSMS {
  electionScheduleId: number;
  userTypeCode: number;
  textValue: string;
}

export const postCenterOfficerBulkSMS = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    userTypeCode,
    textValue,
  }: PostCenterOfficerBulkSMS): Promise<{ data: BulkSMSResType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.CENTER_OFFICER_BULK_SMS, {
      electionScheduleId,
      userTypeCode,
    });

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.post(url, { textValue });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
