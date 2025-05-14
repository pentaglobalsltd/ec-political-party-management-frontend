import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getRmos } from '../api/rmo';

interface useRmosTypes {
  rmos: SelectOptionArray[];
  getRmoData: (params: { [key: string]: any }) => void;
}

const useRmos = (): useRmosTypes => {
  const { language } = useLanguage();
  const [rmos, setRmos] = useState<SelectOptionArray[]>([]);

  const getRmoData = async (params: { [key: string]: any }) => {
    try {
      const response = await getRmos(params);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.rmos?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.nameEn,
          })) || [];

        setRmos(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    rmos,
    getRmoData,
  };
};

export default useRmos;
