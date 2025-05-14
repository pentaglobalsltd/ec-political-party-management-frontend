import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionTypesMaster } from '@api/miscellaneous/election-type.ts/election-types';

const useElectionTypesMaster = () => {
  const { language } = useLanguage();
  const [electionTypesMaster, setElectionTypesMaster] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionTypesMasterData = async () => {
    const response = await getElectionTypesMaster();
    if (response?.data?.status === 200) {
      const dataArray =
        response?.data?.data?.electionTypes?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        })) || [];
      setElectionTypesMaster(dataArray);
    }
  };

  const resetElectionTypesMaster = () => setElectionTypesMaster([]);

  return {
    electionTypesMaster,
    getElectionTypesMasterData,
    resetElectionTypesMaster,
  };
};

export default useElectionTypesMaster;
