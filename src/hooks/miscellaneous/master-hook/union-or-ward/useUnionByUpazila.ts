import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  FetchUnionsByUpazila,
  fetchUnionsByUpazila,
} from '@api/miscellaneous/master-api/union-or-ward/unions-by-upazila';
import { SingleUnionByUpazilaType } from '@type/candidate-info-management/operator-view/union-by-upazila';

export const useUnionByUpazila = () => {
  const { language } = useLanguage();
  const [unionByUpazila, setUnionByUpazila] = useState<SelectOptionArray[]>([]);

  const getUnionByUpazila = async ({
    upazilaId,
    municipalityId,
    rmoEn,
  }: FetchUnionsByUpazila) => {
    const response = await fetchUnionsByUpazila({
      upazilaId,
      municipalityId,
      rmoEn,
    });

    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.unionsOrWards?.map(
        (item: SingleUnionByUpazilaType) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setUnionByUpazila(dataArray);
    }
  };

  return {
    unionByUpazila,
    getUnionByUpazila,
  };
};
