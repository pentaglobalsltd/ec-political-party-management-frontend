import { useEffect, useState } from 'react';
import { getAllocatedSymbolList } from '@api/candidate-info-management/allocated-symbol';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

interface UseAllocatedSymbolListPropType {
  candidateTypeId: string | number;
  isPolitical?: boolean;
}
export const useAllocatedSymbolList = ({
  candidateTypeId,
  isPolitical,
}: UseAllocatedSymbolListPropType) => {
  const { language } = useLanguage();
  const [allocatedSymbol, setAllocatedSymbol] = useState<SelectOptionArray[]>(
    [],
  );

  useEffect(() => {
    getAllocatedSymbolList(candidateTypeId, isPolitical).then((response) => {
      if (response?.data?.status === 200) {
        const allocatedSymbolList = response?.data?.data;
        const dataArray =
          allocatedSymbolList?.symbols?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
            filePath: item.filePath,
          })) || [];

        setAllocatedSymbol(dataArray);
      }
    });
  }, [candidateTypeId, isPolitical, language]);

  return {
    allocatedSymbol,
  };
};
