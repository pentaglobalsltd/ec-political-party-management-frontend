import { useEffect, useState } from 'react';
import { getPoliticalParties } from '@api/miscellaneous/master-api/political-party/political-parties';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const usePoliticalParties = (isPolitical?: boolean) => {
  const { language } = useLanguage();
  const [politicalParties, setPoliticalParties] = useState<SelectOptionArray[]>(
    [],
  );

  useEffect(() => {
    getPoliticalParties(isPolitical).then((response) => {
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.politicalParties?.map(
          (item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
            symbolId: item?.symbol?.symbolId,
            symbolNameBn: item?.symbol?.symbolNameBn,
            symbolNameEn: item?.symbol?.symbolNameEn,
          }),
        );
        setPoliticalParties(dataArray);
      }
    });
  }, [isPolitical, language]);

  return {
    politicalParties,
  };
};
