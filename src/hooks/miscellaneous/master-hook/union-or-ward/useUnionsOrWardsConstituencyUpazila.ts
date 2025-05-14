import { useState } from 'react';
import { fetchUnionsByDoubleConstituenciesNoAuth } from '@api/miscellaneous/master-api/union-or-ward/unions-by-constituencies-constituencies-no-auth';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const useUnionsOrWardsConstituencyUpazila = () => {
  const [
    unionsOrWardsConstituencyUpazila,
    setUnionsOrWardsConstituencyUpazila,
  ] = useState<SelectOptionArray[]>([]);
  const { language } = useLanguage();

  const getUnionsOrWardConstituencyUpazila = async (
    constituencyId?: string | number,
    upazilaId?: string | number,
    rmo?: string | number,
    municiaplityId?: string | number,
  ) => {
    const response = await fetchUnionsByDoubleConstituenciesNoAuth(
      constituencyId,
      upazilaId,
      rmo,
      municiaplityId,
    );
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.unionsOrWards?.map(
        (item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setUnionsOrWardsConstituencyUpazila(dataArray);
    }
  };

  return {
    unionsOrWardsConstituencyUpazila,
    getUnionsOrWardConstituencyUpazila,
  };
};
