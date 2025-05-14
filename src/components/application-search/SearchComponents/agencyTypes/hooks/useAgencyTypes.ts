import { useState } from 'react';
import { getAgencyTypes } from '../api/agencyTypes';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

interface useAgencyTypesReturnType {
  agencyTypes: SelectOptionArray[];
  getAgencyTypesData: () => void;
}

export const useAgencyTypes = (): useAgencyTypesReturnType => {
  const { language } = useLanguage();
  const [agencyTypes, setAgencyTypes] = useState<SelectOptionArray[]>([]);

  const getAgencyTypesData = async () => {
    try {
      const response = await getAgencyTypes();
      if (response?.data?.status === 200) {
        const dataArray = response.data?.data?.agencyTypes?.map(
          (item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );
        setAgencyTypes(dataArray);
      }
    } catch (error) {
      console.log('error');
    }
  };
  return {
    agencyTypes,
    getAgencyTypesData,
  };
};
