import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getElectionSchedulesWithDate } from '@api/miscellaneous/core-api/election-schedules-with-date/election-shedules-with-date-by-elec-type';

interface UseElectionSchedulesPropsTypes {
  electionSchedulesWithDate: SelectOptionArray[];
  getElectionSchedulesDataWithDate: (electionId: string | number) => void;
}

const useElectionSchedulesWithDate = (): UseElectionSchedulesPropsTypes => {
  const { language } = useLanguage();
  const [electionSchedulesWithDate, setElectionSchedulesWithDate] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionSchedulesDataWithDate = async (
    electionId: string | number,
  ) => {
    const response = await getElectionSchedulesWithDate(electionId);
    if (response?.data?.status === 200) {
      const dataArray =
        response?.data?.data?.electionSchedules?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        })) || [];
      setElectionSchedulesWithDate(dataArray);
    }
  };

  return {
    electionSchedulesWithDate,
    getElectionSchedulesDataWithDate,
  };
};

export default useElectionSchedulesWithDate;
