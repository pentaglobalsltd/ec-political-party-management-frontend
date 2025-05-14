import { useState } from 'react';
import {
  FetchUpazilasNoAuth,
  fetchUpazilasNoAuth,
} from '@api/miscellaneous/master-api/upazilas/upazilas-master-no-auth';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const useUpazilas = () => {
  const { language } = useLanguage();
  const [upazilas, setUpaZilas] = useState<SelectOptionArray[]>([]);

  const getUpazila = async (params: FetchUpazilasNoAuth) => {
    const response = await fetchUpazilasNoAuth(params);
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.upazilas?.map((item: any) => ({
        label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
        value: item.id,
      }));
      setUpaZilas(dataArray);
    }
  };

  const resetUpazilas = () => setUpaZilas([]);

  return {
    upazilas,
    getUpazila,
    resetUpazilas,
  };
};
