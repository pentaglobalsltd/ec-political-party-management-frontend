import { useEffect, useState } from 'react';
// import { getBanks } from '@api/auxiliary-apis/master-banks';
import { getBanks } from '@api/miscellaneous/master-api/bank/banks';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const useBanks = () => {
  const { language } = useLanguage();
  const [banks, setBanks] = useState<SelectOptionArray[]>([]);

  useEffect(() => {
    getBanks().then((response) => {
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.banks?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }));
        setBanks(dataArray);
      }
    });
  }, [language]);

  return {
    banks,
  };
};
