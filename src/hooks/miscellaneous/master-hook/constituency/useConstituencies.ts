import { useEffect, useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getConstituencies } from '@api/miscellaneous/master-api/constituency/constituencies';

export const useConstituencies = ({ size }: { size?: number }) => {
  const [constituencies, setConstituencies] = useState<SelectOptionArray[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    getConstituencies({ size }).then((response) => {
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.constituencies?.map(
          (item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );
        setConstituencies(dataArray);
      }
    });
  }, [language, size]);

  return {
    constituencies,
  };
};
