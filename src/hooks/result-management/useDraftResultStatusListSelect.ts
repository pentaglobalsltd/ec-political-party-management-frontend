import { useState } from 'react';

import { SelectOptionArray } from '@type/selection-option-type';
import { fetchResultStatuses } from '@api/result-management/result-statuses';
import { ResultStatusType } from '@type/result-status-types';
import { DRAFT_RESULT_STATUS } from '@constants/polling-center-results';

// Function to map and merge statuses
/*
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
*/

const mapStatuses = (statuses: ResultStatusType[]): SelectOptionArray[] => {
  let result: SelectOptionArray[] = [];
  statuses.forEach((item: any) => {
    if (
      item.message === DRAFT_RESULT_STATUS.RESOLVED ||
      item.message === DRAFT_RESULT_STATUS.UNRESOLVED
    ) {
      result = [
        ...result,
        {
          label: item.message,
          value: item.status,
        },
      ];
    }
  });

  result = [
    ...result,
    {
      label: DRAFT_RESULT_STATUS.ALL,
      value: `${result[0].value}, ${result[1].value}`,
    },
  ];

  return result;
};

const useDraftResultStatusListSelect = () => {
  const [draftResultStatuses, setDraftResultStatuses] = useState<
    SelectOptionArray[]
  >([]);

  const getDraftResultStatuses = async () => {
    const response = await fetchResultStatuses();
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.statuses || [];
      const mappedStatuses = mapStatuses(dataArray);
      setDraftResultStatuses(mappedStatuses);
    }
  };

  return {
    draftResultStatuses,
    getDraftResultStatuses,
  };
};

export default useDraftResultStatusListSelect;
