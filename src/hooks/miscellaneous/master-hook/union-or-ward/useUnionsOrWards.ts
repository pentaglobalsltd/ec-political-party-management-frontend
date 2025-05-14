import { useState } from 'react';
import {
  FetchUnionsOrWardsQueryParams,
  fetchUnionsOrWardsNoAuth,
} from '@api/miscellaneous/master-api/union-or-ward/unions-master-no-auth';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const useUnionsOrWards = () => {
  const [unionsOrWards, setUnionsOrWards] = useState<SelectOptionArray[]>([]);
  const { language } = useLanguage();

  const getUnionsOrWard = async (params: FetchUnionsOrWardsQueryParams) => {
    const response = await fetchUnionsOrWardsNoAuth({ ...params });

    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.unionsOrWards?.map(
        (item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setUnionsOrWards(dataArray);
    }
  };

  const resetUnionsOrWards = () => setUnionsOrWards([]);

  return {
    unionsOrWards,
    getUnionsOrWard,
    resetUnionsOrWards,
  };
};
