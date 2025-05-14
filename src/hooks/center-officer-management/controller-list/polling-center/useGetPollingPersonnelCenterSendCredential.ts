import { useState } from 'react';
import { getPollingPersonnelCenterSendCredential } from '@api/center-officer-management/controller-list/polling-center/polling-personnel-center-send-credential';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const usePollingPersonnelCenterSendCredential = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pollingPersonnelCenterSendCredentialData = async ({
    pollingPersonnelCenterId,
  }: {
    pollingPersonnelCenterId: number;
  }) => {
    try {
      setSuccess(false);
      setLoading(true);
      const response = await getPollingPersonnelCenterSendCredential({
        pollingPersonnelCenterId,
      });
      if (response?.data?.status === 204) {
        toast.success(t('TOAST_MESSAGE.SEND_SMS_SUCCESS_MESSAGE'));
        setSuccess(true);
        setLoading(false);
      } else {
        toast.error(t('TOAST_MESSAGE.SEND_SMS_ERROR_MESSAGE'));
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return {
    pollingPersonnelCenterSendCredentialData,
    success,
    loading,
    setSuccess,
  };
};
