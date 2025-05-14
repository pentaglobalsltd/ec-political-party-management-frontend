import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionSchedulesConstituencies } from '@api/miscellaneous/core-api/constituency/constituencies-by-schedule-zilla';

interface useElectionSchedulesConstituenciesTypes {
  constituencies: SelectOptionArray[];
  resetConstituencies: () => void;
  getElectionSchedulesConstituenciesData: (
    electionSchedulesId: string | number,
    electionSchedulesZillaId: string | number,
    electionSettingsValue?: boolean,
    setData?: (data: SelectOptionArray[]) => void,
  ) => void;
}

const useElectionSchedulesConstituencies =
  (): useElectionSchedulesConstituenciesTypes => {
    const { language } = useLanguage();
    const [constituencies, setConstituencies] = useState<SelectOptionArray[]>(
      [],
    );

    const getElectionSchedulesConstituenciesData = async (
      electionSchedulesId: string | number,
      electionSchedulesZillaId: string | number,
      electionSettingsValue?: boolean,
      setData?: (data: SelectOptionArray[]) => void,
    ) => {
      try {
        const response = await getElectionSchedulesConstituencies(
          electionSchedulesId,
          electionSchedulesZillaId,
        );
        if (response?.data?.status === 200) {
          const dataArray =
            response?.data?.data?.constituencies?.map((item: any) => ({
              id: item.id,
              label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
              value: electionSettingsValue ? item.electionSettingsId : item.id,
            })) || [];
          setData && setData(dataArray);
          setConstituencies(dataArray);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const resetConstituencies = () => setConstituencies([]);

    return {
      constituencies,
      getElectionSchedulesConstituenciesData,
      resetConstituencies,
    };
  };

export default useElectionSchedulesConstituencies;
