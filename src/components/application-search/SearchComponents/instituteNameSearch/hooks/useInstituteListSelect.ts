import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getAgencyList } from '../api/get-agency-list';

interface HookReturnType {
  institutes: SelectOptionArray[];
  getInstituteList: ({
    params,
    filter,
  }: {
    params: {
      [key: string]: string | number;
    };
    filter: {
      [key: string]: string | number;
    };
  }) => void;
}

export const useInstituteList = (): HookReturnType => {
  const { language } = useLanguage();
  const [institutes, setInstitutes] = useState([]);

  const getInstituteList = async ({
    params,
    filter,
  }: {
    params: {
      [key: string]: string | number;
    };
    filter: {
      [key: string]: string | number;
    };
  }) => {
    try {
      const response = await getAgencyList({ params, filter });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.agencies?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }));
        setInstitutes(dataArray as any);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    institutes,
    getInstituteList,
  };
};
