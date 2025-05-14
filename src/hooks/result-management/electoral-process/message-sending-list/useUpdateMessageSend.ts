import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { updateMessageSendAPI } from '@api/result-management/electoral-process/message-sending-list/get-message-sending-list';
import { FileType } from '@type/result-management/electoral-process/message-sending-list/message-sending-list-type';

export interface MessageSendProps {
  data: { sheetStatus: string; finalFile?: FileType };
  scheduleId: number | string;
  id: number | string;
}

export const useUpdateMessageSend = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const updateMessageSend = async ({
    data,
    scheduleId,
    id,
  }: MessageSendProps) => {
    try {
      setLoading(true);
      setIsSuccess(false);
      const response = await updateMessageSendAPI(data, scheduleId, id);
      if (response?.data?.status === 200) {
        setLoading(false);
        setIsSuccess(true);
        toast.success(t('MESSAGE_SEND_LIST_PUBLISH.MODAL.SUCCESS_TOAST'));
      } else {
        const {
          response: { data },
        } = response as any;
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return {
    updateMessageSend,
    loading,
    isSuccess,
    setIsSuccess,
  };
};
