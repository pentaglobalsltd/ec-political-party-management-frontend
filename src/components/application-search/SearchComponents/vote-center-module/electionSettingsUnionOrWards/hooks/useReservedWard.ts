import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiReserveWards } from '../api/reserveWards';

export const useReservedWards = () => {
  const [reserveWards, setReservedWards] = useState([]);
  const { language } = useLanguage();
  const [success, setSuccess] = useState(false);

  const getReservedWardsData = async ({
    filter,
  }: {
    filter?: {
      [key: string]: string | number;
    };
  }) => {
    try {
      setSuccess(false);

      const response = await apiReserveWards(filter);
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.reservedWards?.map(
          (item: { nameBn: string; nameEn: string; id: string }) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );

        setReservedWards(dataArray);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    reserveWards,
    getReservedWardsData,
    success,
  };
};
