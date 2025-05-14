import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getRegions } from '@api/election-schedule-management/main-list/region/regions';
import { SelectOptionArray } from '@type/selection-option-type';

export const useRegionListSelect = () => {
  const { language } = useLanguage();
  const [regions, setRegions] = useState<SelectOptionArray[]>([]);

  const getRegionListSelect = async () => {
    const response = await getRegions({});
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.regions?.map((item: any) => ({
        label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
        value: item.id,
      }));
      setRegions(dataArray);
    }
  };

  return {
    regions,
    getRegionListSelect,
  };
};
