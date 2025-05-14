import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getUnionWardApi } from '../api/union-ward';

export const useUnionWard = () => {
  const { language } = useLanguage();
  const [unionWard, setUnionWard] = useState<SelectOptionArray[]>([]);

  const getUnionWard = async ({
    params,
  }: {
    params: {
      [key: string]: string | number;
    };
  }) => {
    try {
      const response = await getUnionWardApi({ params });

      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.unionWards?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
            value: item?.id,
            extra: {
              constituencyId: item?.id,
              electionSettingsId: item?.electionSettingsId,
            },
          })) || [];

        setUnionWard(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    unionWard,
    getUnionWard,
  };
};
