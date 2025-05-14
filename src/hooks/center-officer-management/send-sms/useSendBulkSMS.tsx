import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  PostCenterOfficerBulkSMS,
  postCenterOfficerBulkSMS,
} from '@api/center-officer-management/send-sms/bulk-sms';

interface HookReturnType {
  sendBulkSMS: (obj: PostCenterOfficerBulkSMS) => void;
  loading: boolean;
  success: boolean;
}

export const useSendBulkSMS = (): HookReturnType => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendBulkSMS = async ({
    electionScheduleId,
    userTypeCode,
    textValue,
  }: PostCenterOfficerBulkSMS) => {
    try {
      setLoading(true);
      setSuccess(false);

      const response = await postCenterOfficerBulkSMS({
        electionScheduleId,
        userTypeCode,
        textValue,
      });

      if (response?.data?.status === 200) {
        const data = response?.data?.data || {};

        setLoading(false);
        setSuccess(true);

        // toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
        toast.success(data?.textValue);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return {
    sendBulkSMS,
    loading,
    success,
  };
};
