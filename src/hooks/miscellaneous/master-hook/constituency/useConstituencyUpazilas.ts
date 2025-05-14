import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getConstituenciesUpazila } from '@api/miscellaneous/master-api/constituency/constituencies-upazilas';

export const useConstituencyUpazila = () => {
  const { language } = useLanguage();
  const [upazilas, setUpazilas] = useState([]);

  const getConstituenciesUpazilaData = async (constituencyId: any) => {
    try {
      const response = await getConstituenciesUpazila({ constituencyId });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.upazilas?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }));
        setUpazilas(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetUpazilas = () => setUpazilas([]);

  return {
    upazilas,
    getConstituenciesUpazilaData,
    resetUpazilas,
  };
};
