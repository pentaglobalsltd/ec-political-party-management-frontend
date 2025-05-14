import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { useState } from 'react';
import { getElectionSchedulesRegions } from '@api/miscellaneous/core-api/region/regions-by-schedule';

interface useElectionSchedulesRegionsTypes {
  electionSchedulesRegions: SelectOptionArray[];
  getElectionSchedulesRegionsData: (
    electionScheduleId: string | number,
  ) => void;
}

const useElectionSchedulesRegions = (): useElectionSchedulesRegionsTypes => {
  const { language } = useLanguage();
  const [electionSchedulesRegions, setElectionSchedulesRegions] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionSchedulesRegionsData = async (
    electionScheduleId: string | number,
  ) => {
    const response = await getElectionSchedulesRegions(electionScheduleId);
    if (response?.data?.status === 200) {
      const dataArray =
        response?.data?.data?.regions?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        })) || [];

      setElectionSchedulesRegions(dataArray);
    }
  };

  return {
    electionSchedulesRegions,
    getElectionSchedulesRegionsData,
  };
};

export default useElectionSchedulesRegions;
