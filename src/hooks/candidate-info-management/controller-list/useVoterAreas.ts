import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getVoterAreas } from '@api/candidate-info-management/voter-areas';
import { SelectOptionArray } from '@type/selection-option-type';

export const useVoterAreas = () => {
  const { language } = useLanguage();
  const [voterArea, setVoterAreas] = useState<SelectOptionArray[]>([]);

  const getVoterArea = async (
    zillaId?: string | number,
    upazillaId?: string | number,
    unionOrWardId?: string | number,
  ) => {
    try {
      const response = await getVoterAreas(zillaId, upazillaId, unionOrWardId);
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.voterAreas?.map(
          (item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );
        setVoterAreas(dataArray);
      }
    } catch (error) {
      setVoterAreas([]);
    }
  };

  return {
    voterArea,
    getVoterArea,
  };
};
