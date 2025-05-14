import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getConstituencies } from '@api/miscellaneous/master-api/constituency/constituencies';

export const useConstituencyListSelect = () => {
  const { language } = useLanguage();
  const [constituencies, setConstituencies] = useState([]);

  const getConstituencyListSelect = async ({
    zillaId,
  }: {
    zillaId?: number;
  }) => {
    try {
      const response = await getConstituencies({ zillaId });
      const dataArray = response?.data?.data?.constituencies?.map(
        (item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setConstituencies(dataArray);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    constituencies,
    getConstituencyListSelect,
  };
};
