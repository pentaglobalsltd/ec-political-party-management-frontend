import { useEffect, useState } from 'react';
import { getRMOs } from '@api/miscellaneous/master-api/rmo/rmos-master-no-auth';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const useRMOs = () => {
  const [rmos, setRmos] = useState<SelectOptionArray[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    getRMOs().then((response) => {
      if (response?.data?.status) {
        const dataArray = response?.data?.data?.rmos?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.nameEn,
        }));
        setRmos(dataArray);
      }
    });
  }, [language]);

  return {
    rmos,
  };
};
