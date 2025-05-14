import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getUserTypesApi } from '@api/user-management-service/user-types/user-types';

interface UseUserTypes {
  userTypes: SelectOptionArray[];
  getUserTypesData: ({
    type,
    userTypeCodes,
  }: {
    type?: string;
    userTypeCodes?: string;
  }) => void;
}

const useUserTypesList = (): UseUserTypes => {
  const { language } = useLanguage();
  const [userTypes, setUserTypes] = useState<SelectOptionArray[]>([]);

  const getUserTypesData = async ({
    type,
    userTypeCodes,
  }: {
    type?: string;
    userTypeCodes?: string;
  }) => {
    try {
      const response = await getUserTypesApi(type, userTypeCodes);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.userTypes?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.code,
          })) || [];
        setUserTypes(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    userTypes,
    getUserTypesData,
  };
};

export default useUserTypesList;
