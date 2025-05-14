import { useState } from 'react';
import { getDistrictConstituencies } from '@api/miscellaneous/master-api/constituency/constituencies-by-zilla';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

export const useDistrictConstituencies = () => {
  const { language } = useLanguage();
  const [constituencies, setConstituencies] = useState([]);

  const getDistrictConstituenciesData = async ({
    zillaId,
    isActive,
  }: {
    zillaId: string | number;
    isActive?: boolean;
  }) => {
    try {
      const response = await getDistrictConstituencies({ zillaId, isActive });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.constituencies?.map(
          (item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );
        setConstituencies(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    constituencies,
    getDistrictConstituenciesData,
  };
};
