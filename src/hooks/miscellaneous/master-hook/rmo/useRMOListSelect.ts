import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchRMOList } from '@api/miscellaneous/master-api/rmo/rmos-master-auth';

export const useRMOListSelect = () => {
  const { language } = useLanguage();
  const [rmos, setRmos] = useState([]);

  const getRMOListSelect = async () => {
    try {
      const response = await fetchRMOList();
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.rmos?.map(
          (item: { nameBn: string; nameEn: string }) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.nameEn,
          }),
        );
        setRmos(dataArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    rmos,
    getRMOListSelect,
  };
};
