import { useEffect, useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getRegions } from '@api/election-schedule-management/main-list/region/regions';

export const useRegions = () => {
  const { language } = useLanguage();
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    getRegions({}).then((response) => {
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.regions?.map(
          (item: { nameBn: string; nameEn: string; id: string }) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );
        setRegions(dataArray);
      }
    });
  }, [language]);

  return {
    regions,
  };
};
