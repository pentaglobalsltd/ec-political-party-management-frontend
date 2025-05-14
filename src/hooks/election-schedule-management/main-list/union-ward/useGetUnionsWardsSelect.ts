import { useState } from 'react';
import { fetchUnionsWards } from '@api/election-schedule-management/main-list/union-ward/fetchUnionWardsList';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { UnionWardQueryParams } from '@type/election-declaration-management/main-list/union-ward/union-ward-type';

interface HookReturnType {
  unionsWards: SelectOptionArray[];
  success: boolean;
  getUnionsWardsSelect: (obj: UnionWardQueryParams) => void;
}

export const useGetUnionsWardsSelect = (): HookReturnType => {
  const { language } = useLanguage();
  const [unionsWards, setUnionsWards] = useState<SelectOptionArray[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const getUnionsWardsSelect = async (params: UnionWardQueryParams) => {
    setSuccess(false);
    try {
      const response = await fetchUnionsWards({
        ...params,
      });
      if (response?.data?.status === 200 && response?.data?.data?.unionWards) {
        const dataArray = response?.data?.data?.unionWards?.map(
          (item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );

        setUnionsWards(dataArray);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  };

  return {
    unionsWards,
    getUnionsWardsSelect,
    success,
  };
};
