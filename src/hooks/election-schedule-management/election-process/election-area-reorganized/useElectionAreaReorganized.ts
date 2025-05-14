import { getElectionAreaReorganized } from '@api/election-schedule-management/election-process/election-area-reorganized/election-area-reorganized';
import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { ElectionAreaReorganizedType } from '@type/election-area-reorganized/election-area-reorganized';

export const useElectionAreaReorganized = () => {
  const [electionAreaReorganized, setElectionAreaReorganized] = useState([]);
  const { language } = useLanguage();
  const getElectionAreaReorganizedData = async () => {
    try {
      const response = await getElectionAreaReorganized();
      if (response?.data?.status === 200) {
        const dataArray = response.data?.data?.electionAreaReorganized?.map(
          (item: ElectionAreaReorganizedType) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.nameEn,
          }),
        );
        setElectionAreaReorganized(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    electionAreaReorganized,
    getElectionAreaReorganizedData,
  };
};
