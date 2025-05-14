import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { createBartaSheet } from '@api/result-management/electoral-process/message-sending-list-prepare/barta-sheets';

export const useCreateSendingMessageListPrepare = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const addSendingMessageListPrepare = async (data: any) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await createBartaSheet({
        data,
      });
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('MESSAGE_SEND_LIST_PREPARE.SUCCESS_TOAST'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return { addSendingMessageListPrepare, loading, success };
};
