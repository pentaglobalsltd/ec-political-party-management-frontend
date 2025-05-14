import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { apiGetUpazilasOrThanas } from '../api/upazilas-or-thanas';

interface HookReturnType {
  upazilasOrThanas: SelectOptionArray[];
  getUpazilasOrThanas: (params: { [key: string]: string | number }) => void;
}

export const useUpazilasOrThanas = (): HookReturnType => {
  const { language } = useLanguage();
  const [upazilasOrThanas, setUpazilasOrThanas] = useState<SelectOptionArray[]>(
    [],
  );

  const getUpazilasOrThanas = async (params: {
    [key: string]: string | number;
  }) => {
    try {
      const response = await apiGetUpazilasOrThanas(params);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.upazilas?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setUpazilasOrThanas(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    upazilasOrThanas,
    getUpazilasOrThanas,
  };
};
