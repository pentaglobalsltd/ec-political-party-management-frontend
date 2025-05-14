import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { VoterTypesType } from '@type/vote-center-management/voter-type-types';
import { getVoteCenterTypesApi } from '@api/vote-center-management/main-list/voter-area/voter-types';

interface HookReturnType {
  voterTypesList: SelectOption[];
  getVoterTypesList: () => void;
  resetVoterTypesList: () => void;
}

interface SelectOption {
  label: string;
  value: string;
}

const useVoterTypes = (): HookReturnType => {
  const { language } = useLanguage();

  const [voterTypesList, setVoterTypesList] = useState<SelectOption[]>([]);

  const getVoterTypesList = async () => {
    try {
      const response = await getVoteCenterTypesApi();
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.voterTypes?.map((item: VoterTypesType) => {
            return {
              label: language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
              value: item?.nameEn,
            };
          }) || [];

        setVoterTypesList(dataArray || []);
      }
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  const resetVoterTypesList = () => setVoterTypesList([]);

  return { voterTypesList, getVoterTypesList, resetVoterTypesList };
};

export default useVoterTypes;
