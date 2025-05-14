import { useState } from 'react';

import { getElectionSchedules } from '../api/election-schedules';
import {
  useLanguage,
  LANGUAGE,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

interface UseElectionSchedulesPropsTypes {
  electionSchedules: SelectOptionArray[];
  getElectionSchedulesData: (params: {
    [key: string]: string | number;
  }) => void;
  resetElectionSchedules: () => void;
}

const useElectionSchedules = (
  isActive?: boolean,
): UseElectionSchedulesPropsTypes => {
  const { language } = useLanguage();
  const [electionSchedules, setElectionSchedules] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionSchedulesData = async (params: {
    [key: string]: string | number;
  }) => {
    try {
      const response = await getElectionSchedules(params, isActive);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.electionSchedules?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
            extra: {
              dateOfElection: item?.dateOfElection,
            },
          })) || [];
        setElectionSchedules(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetElectionSchedules = () => setElectionSchedules([]);

  return {
    electionSchedules,
    getElectionSchedulesData,
    resetElectionSchedules,
  };
};

export default useElectionSchedules;
