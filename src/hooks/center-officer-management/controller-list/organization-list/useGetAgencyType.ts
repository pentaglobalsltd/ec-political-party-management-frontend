import { useState } from 'react';
import { getAgencyType } from '@api/center-officer-management/controller-list/organization-list/get-agencyType';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

export const useAgencyType = () => {
  const [agencyType, setAgencyType] = useState([]);
  const { language } = useLanguage();

  const getAgencyTypeData = async () => {
    const response = await getAgencyType();
    if (response?.data?.status === 200) {
      const dataArray = response.data?.data?.agencyTypes?.map((item: any) => ({
        label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
        value: item.id,
      }));
      setAgencyType(dataArray);
    }
  };

  return {
    agencyType,
    getAgencyTypeData,
  };
};
