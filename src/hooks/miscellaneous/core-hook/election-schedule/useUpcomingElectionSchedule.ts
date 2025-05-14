import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getUpcomingElectionSchedules } from '@api/miscellaneous/core-api/election-schedule/upcoming-election-schedule';

interface UseElectionSchedulesPropsTypes {
  upcomingElectionSchedules: SelectOptionArray[];
  getUpcomingElectionSchedulesData: () => void;
}

const useUpcomingElectionSchedules = (): UseElectionSchedulesPropsTypes => {
  const { language } = useLanguage();
  const [upcomingElectionSchedules, setUpcomingElectionSchedules] = useState<
    SelectOptionArray[]
  >([]);

  const getUpcomingElectionSchedulesData = async () => {
    try {
      const response = await getUpcomingElectionSchedules();
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.electionSchedules?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];
        setUpcomingElectionSchedules(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    upcomingElectionSchedules,
    getUpcomingElectionSchedulesData,
  };
};

export default useUpcomingElectionSchedules;
