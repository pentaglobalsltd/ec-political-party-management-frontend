import { useState } from 'react';
import { fetchMessageList } from '@api/election-schedule-management/main-list/message-list/message-list';

export const useGetMessageList = () => {
  const [messages, setMessages] = useState([]);

  const getMessageList = async () => {
    try {
      const response = await fetchMessageList();
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.messages?.map((item: any) => ({
            ...item,
            idx: item.id,
          })) || [];
        setMessages(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    messages,
    getMessageList,
  };
};
