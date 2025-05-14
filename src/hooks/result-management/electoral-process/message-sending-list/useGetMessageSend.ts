import { fetchMessageSend } from '@api/result-management/electoral-process/message-sending-list/get-message-sending-list';
import { useState } from 'react';

export interface MessageSendProps {
  scheduleId: number | string;
  id: number | string;
}

export const useGetMessageSend = () => {
  const [messageSendData, setMessageSendData] = useState<any>({});

  const [loading, setLoading] = useState(false);

  const getMessageSend = async ({ scheduleId, id }: MessageSendProps) => {
    try {
      setLoading(true);
      const response = await fetchMessageSend({
        scheduleId,
        id,
      });
      if (response?.data?.status === 200) {
        setMessageSendData(response?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return {
    loading,
    messageSendData,
    getMessageSend,
  };
};
