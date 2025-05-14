import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getConstituencies } from '../api/constituencies';

const useConstituencies = () => {
  const { language } = useLanguage();
  const [constituencies, setConstituencies] = useState<SelectOptionArray[]>([]);

  const getConstituenciesData = async ({
    params,
    getElectionSettings,
  }: {
    params: {
      [key: string]: string | number;
    };
    getElectionSettings?: boolean;
  }) => {
    try {
      const response = await getConstituencies(params);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.constituencies?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: getElectionSettings ? item.electionSettingsId : item.id,
            extra: {
              constituencyId: item?.id,
              electionSettingsId: item?.electionSettingsId,
            },
          })) || [];

        setConstituencies(dataArray);
      } else {
        setConstituencies([]);
      }
    } catch (error) {
      console.log(error);
      setConstituencies([]);
    }
  };

  const resetConstituencies = () => setConstituencies([]);

  return {
    constituencies,
    resetConstituencies,
    getConstituenciesData,
  };
};

export default useConstituencies;
