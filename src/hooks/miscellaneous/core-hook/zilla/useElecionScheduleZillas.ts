import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionSchedulesZillas } from '@api/miscellaneous/core-api/zilla/zillas-by-schedule';

interface useElectionSchedulesZillasTypes {
  electionSchedulesZillas: SelectOptionArray[];
  getElectionSchedulesDistrictData: (
    electionSchedulesId: string | number,
  ) => void;
}

const useElectionSchedulesZillas = (): useElectionSchedulesZillasTypes => {
  const { language } = useLanguage();
  const [electionSchedulesZillas, setElectionSchedulesZillas] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionSchedulesDistrictData = async (
    electionSchedulesId: string | number,
  ) => {
    try {
      const response = await getElectionSchedulesZillas(electionSchedulesId);
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
    getElectionSchedulesDistrictData,
  };
};

export default useElectionSchedulesZillas;
