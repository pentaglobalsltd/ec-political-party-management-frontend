import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetCoreUnionOrWardsData } from '../api/core-union-or-wards';

export const useCoreUnionOrWardsSearch = () => {
  const { language } = useLanguage();
  const [coreUnionOrWards, setCoreUnionOrWards] = useState<SelectOptionArray[]>(
    [],
  );

  const getCoreUnionOrWardsData = async ({
    params,
  }: {
    params: {
      [key: string]: string | number;
    };
  }) => {
    try {
      const response = await apiGetCoreUnionOrWardsData(params);

      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.unionsOrWards?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
            extra: {
              electionSettingsId: item?.electionSettingsId,
              constituencyId: item?.id,
            },
          })) || [];

        setCoreUnionOrWards(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    coreUnionOrWards,
    getCoreUnionOrWardsData,
  };
};
