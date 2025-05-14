import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getRegions } from '../api/region';

interface useRegionsTypes {
  regions: SelectOptionArray[];
  getRegionData: (params: { [key: string]: any }) => void;
}

const useRegions = (): useRegionsTypes => {
  const { language } = useLanguage();
  const [regions, setRegions] = useState<SelectOptionArray[]>([]);

  const getRegionData = async (params: { [key: string]: any }) => {
    try {
      const response = await getRegions(params);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.regions?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setRegions(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    regions,
    getRegionData,
  };
};

export default useRegions;
