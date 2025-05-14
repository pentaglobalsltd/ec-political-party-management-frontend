import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetUnionsOrWards } from '../api/unions-or-wards-by-constituencies-upazilla';

export const useElectionSettingsUnionsOrWards = () => {
  const [unionsOrWards, setUnionsOrWards] = useState([]);
  const { language } = useLanguage();
  const [success, setSuccess] = useState(false);

  const getUnionsOrWardsData = async ({
    params,

    filter,
  }: {
    params: {
      [key: string]: string | number;
    };

    filter?: {
      [key: string]: string | number;
    };
  }) => {
    try {
      setSuccess(false);

      const response = await apiGetUnionsOrWards(params, filter);
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.unionsOrWards?.map(
          (item: { nameBn: string; nameEn: string; id: string }) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );

        setUnionsOrWards(dataArray);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetUnionsOrWards = () => setUnionsOrWards([]);

  return {
    unionsOrWards,
    getUnionsOrWardsData,
    resetUnionsOrWards,
    success,
  };
};
