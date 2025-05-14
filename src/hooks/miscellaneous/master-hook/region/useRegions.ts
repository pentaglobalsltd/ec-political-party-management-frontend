import { useEffect, useState } from 'react';
import { getRegions } from '@api/miscellaneous/master-api/region/regions';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const useRegions = () => {
  const { language } = useLanguage();
  const [regions, setRegions] = useState<SelectOptionArray[]>([]);

  useEffect(() => {
    getRegions().then((response) => {
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.regions?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }));
        setRegions(dataArray);
      }
    });
  }, [language]);

  return {
    regions,
  };
};
