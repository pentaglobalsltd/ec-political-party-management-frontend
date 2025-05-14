import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getUnionApi } from '../api/union';

export const useUnion = () => {
  const { language } = useLanguage();
  const [union, setUnion] = useState<SelectOptionArray[]>([]);

  const getUnion = async ({
    params,
    filter,
  }: {
    params: {
      [key: string]: string | number;
    };
    filter?: {
      [key: string]: string | number;
    };
  }) => {
    try {
      const response = await getUnionApi({ params, filter });

      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.constituencies?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
            value: item?.id,
            extra: {
              constituencyId: item?.id,
              electionSettingsId: item?.electionSettingsId,
            },
          })) || [];

        setUnion(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    union,
    getUnion,
  };
};
