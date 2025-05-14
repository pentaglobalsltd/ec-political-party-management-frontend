import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetCoreMunicipalities } from '../api/coreMunicipalities';

interface HookReturnType {
  coreMunicipalities: SelectOptionArray[];
  getCoreMunicipalities: ({
    params,
    filter,
  }: {
    params: {
      [key: string]: string | number;
    };

    filter?: {
      [key: string]: string | number;
    };
  }) => void;
}

export const useCoreMunicipalities = (): HookReturnType => {
  const { language } = useLanguage();
  const [coreMunicipalities, setCoreMunicipalities] = useState<
    SelectOptionArray[]
  >([]);

  const getCoreMunicipalities = async ({
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
      const response = await apiGetCoreMunicipalities({ params, filter });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.municipalities?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setCoreMunicipalities(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    coreMunicipalities,
    getCoreMunicipalities,
  };
};
