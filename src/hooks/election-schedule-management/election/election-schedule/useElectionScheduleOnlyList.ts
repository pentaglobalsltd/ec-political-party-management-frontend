import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionScheduleList } from '@api/election-schedule-management/election/election-schedule/schedule-declaration';

interface UseElectionSchedulesPropsTypes {
  electionSchedules: SelectOptionArray[];
  getElectionSchedulesData: () => void;
}

const useElectionSchedulesOnlyList = (): UseElectionSchedulesPropsTypes => {
  const { language } = useLanguage();
  const [electionSchedules, setElectionSchedules] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionSchedulesData = async () => {
    try {
      const response = await getElectionScheduleList();
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

  return {
    electionSchedules,
    getElectionSchedulesData,
  };
};

export default useElectionSchedulesOnlyList;
