import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionTypesCore } from '@api/miscellaneous/election-type.ts/election-types-core';

const useElectionTypesCore = () => {
  const { language } = useLanguage();
  const [electionTypesCore, setElectionTypesCore] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionTypesCoreData = async () => {
    const response = await getElectionTypesCore();
    if (response?.data?.status === 200) {
      const dataArray =
        response?.data?.data?.electionTypes?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        })) || [];
      setElectionTypesCore(dataArray);
    }
  };
  return {
    electionTypesCore,
    getElectionTypesCoreData,
  };
};

export default useElectionTypesCore;
