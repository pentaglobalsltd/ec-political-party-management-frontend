import { useState } from 'react';
import { getZillas } from '@api/miscellaneous/master-api/zilla/zillas';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const useZillas = () => {
  const { language } = useLanguage();
  const [zillas, setZillas] = useState<SelectOptionArray[]>([]);

  const getZilla = async (regionId?: string | number) => {
    const response = await getZillas(regionId);
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.zillas?.map((item: any) => ({
        label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
        value: item.id,
      }));

      setZillas(dataArray);
    }
  };

  return {
    zillas,
    getZilla,
  };
};
