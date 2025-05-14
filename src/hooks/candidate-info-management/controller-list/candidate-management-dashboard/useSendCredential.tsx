import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { getSendCredentialApi } from '@api/candidate-info-management/send-credential';

export interface GetSendCredential {
  candidateElectionDetailsId: string | number;
  newPassword?: string;
}

interface HookReturnType {
  getSendCredential: (obj: GetSendCredential) => void;
  loading: boolean;
  success: boolean;
}

export const useSendCredential = (): HookReturnType => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getSendCredential = async ({
    candidateElectionDetailsId,
    newPassword,
  }: GetSendCredential) => {
    setLoading(true);

    try {
      const response = await getSendCredentialApi({
        candidateElectionDetailsId,
        newPassword,
      });
      if (response?.data?.status === 204) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.SEND_SMS_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        setSuccess(false);
        toast.error(t('TOAST_MESSAGE.SEND_SMS_ERROR_MESSAGE'));
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      toast.error(t('TOAST_MESSAGE.SEND_SMS_ERROR_MESSAGE'));
    }
  };

  return {
    getSendCredential,
    loading,
    success,
  };
};
