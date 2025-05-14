import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getAgencyList } from '@api/center-officer-management/controller-list/organization-list/get-agency-list';
import { CenterOfficerManagementSearchProps } from '@type/search-types';

export const useInstituteListSelect = () => {
  const { language } = useLanguage();
  const [institutes, setInstitutes] = useState([]);

  const getInstituteListSelect = async (
    searchItems: CenterOfficerManagementSearchProps,
  ) => {
    const response = await getAgencyList(searchItems);
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.agencies?.map((item) => ({
        label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
        value: item.id,
      }));
      setInstitutes(dataArray as any);
    }
  };

  return {
    institutes,
    getInstituteListSelect,
  };
};
