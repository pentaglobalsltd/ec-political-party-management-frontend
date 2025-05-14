import { useState } from 'react';

import { fetchMessageSendListStatuses } from '@api/result-management/message-send-list-statuses';
import { SelectOptionArray } from '@type/selection-option-type';
import { MessageSendStatusType } from '@type/message-send-list-status-types';

const useGetMessageSendStatusSelect = () => {
  const [messageSendStatuses, setMessageSendStatuses] = useState<
    SelectOptionArray[]
  >([]);

  const getMessageSendStatuses = async () => {
    const response = await fetchMessageSendListStatuses();
    if (response?.data?.status === 200) {
      const dataArray =
        response?.data?.data?.statuses?.map((item: MessageSendStatusType) => ({
          label: item?.message,
          value: item?.sheetStatus,
        })) || [];

      setMessageSendStatuses(dataArray);
    }
  };

  return {
    messageSendStatuses,
    getMessageSendStatuses,
  };
};

export default useGetMessageSendStatusSelect;
