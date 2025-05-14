import { getSymbolListAPI } from '@api/center-officer-management/controller-list/symbol-list/symbol-list';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { useState } from 'react';

export const useSymbolListSelect = () => {
  const [symbolList, setSymbolList] = useState<SelectOptionArray[]>([]);
  const { language } = useLanguage();

  const getSymbolList = async (politicalPartyId?: number | string) => {
    const response = await getSymbolListAPI(politicalPartyId);
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.symbols?.map(
        (item: { nameBn: string; nameEn: string; id: string }) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setSymbolList(dataArray);
    }
  };

  return { symbolList, getSymbolList };
};
