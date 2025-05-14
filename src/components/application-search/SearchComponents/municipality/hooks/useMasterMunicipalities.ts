import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetMasterMunicipalities } from '../api/masterMunicipalities';

interface HookReturnType {
  masterMunicipalities: SelectOptionArray[];
  getMasterMunicipalities: ({
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

export const useMasterMunicipalities = (): HookReturnType => {
  const { language } = useLanguage();
  const [masterMunicipalities, setMasterMunicipalities] = useState<
    SelectOptionArray[]
  >([]);

  const getMasterMunicipalities = async ({
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
      const response = await apiGetMasterMunicipalities({ params, filter });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.municipalities?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setMasterMunicipalities(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    masterMunicipalities,
    getMasterMunicipalities,
  };
};
