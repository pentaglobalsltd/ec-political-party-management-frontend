import { useState } from 'react';

import { SelectOptionArray } from '@type/selection-option-type';
import { fetchResultStatuses } from '@api/result-management/result-statuses';
import { ResultStatusType } from '@type/result-status-types';

// Function to map and merge statuses
const mapStatuses = (statuses: ResultStatusType[]): SelectOptionArray[] => {
  const statusMap: { [key: string]: any } = {};

  statuses.forEach((item: any) => {
    const existingStatus = statusMap[item.message];

    if (existingStatus) {
      existingStatus.value = `${existingStatus.value},${item.status}`;
    } else {
      statusMap[item.message] = {
        label: item.message,
        value: item.status,
      };
    }
  });

  const resultStatusArray = Object.values(statusMap);
  return resultStatusArray;
};

const useResultStatusListSelect = () => {
  const [resultStatuses, setResultStatuses] = useState<SelectOptionArray[]>([]);

  const getResultStatuses = async () => {
    const response = await fetchResultStatuses();
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.statuses || [];
      const mappedStatuses = mapStatuses(dataArray);
      setResultStatuses(mappedStatuses);
    }
  };

  return {
    resultStatuses,
    getResultStatuses,
  };
};

export default useResultStatusListSelect;
