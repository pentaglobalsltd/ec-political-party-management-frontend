import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionSchedules } from '@api/miscellaneous/core-api/election-schedule/election-schedules-by-elec-type';

interface UseElectionSchedulesPropsTypes {
  electionSchedules: SelectOptionArray[];
  getElectionSchedulesData: (electionId: string | number) => void;
  resetElectionSchedules: () => void;
}

const useElectionSchedules = (
  isActive?: boolean,
): UseElectionSchedulesPropsTypes => {
  const { language } = useLanguage();
  const [electionSchedules, setElectionSchedules] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionSchedulesData = async (electionId: string | number) => {
    try {
      const response = await getElectionSchedules(electionId, isActive);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.electionSchedules?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
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
