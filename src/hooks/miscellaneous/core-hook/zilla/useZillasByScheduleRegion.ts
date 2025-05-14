import { useState } from 'react';
import { getZillasByScheduleRegion } from '@api/miscellaneous/core-api/zilla/zillas-by-schedule-region';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

interface useElectionSchedulesZillasTypes {
  electionSchedulesZillas: SelectOptionArray[];
  getElectionSchedulesZillasData: (
    electionSchedulesId: string | number,
    electionSchedulesRegionsId: string | number,
  ) => void;
}

const useElectionSchedulesZillas = (): useElectionSchedulesZillasTypes => {
  const { language } = useLanguage();
  const [electionSchedulesZillas, setElectionSchedulesZillas] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionSchedulesZillasData = async (
    electionSchedulesId: string | number,
    electionSchedulesRegionsId: string | number,
  ) => {
    try {
      const response = await getZillasByScheduleRegion(
        electionSchedulesId,
        electionSchedulesRegionsId,
      );
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.zillas?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setElectionSchedulesZillas(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    electionSchedulesZillas,
    getElectionSchedulesZillasData,
  };
};

export default useElectionSchedulesZillas;
