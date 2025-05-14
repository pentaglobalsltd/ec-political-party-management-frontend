import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getMunicipalitiesListFromZilla } from '@api/miscellaneous/master-api/municipality/municipalities-by-zilla';

export const useMunicipalitiesListSelect = () => {
  const { language } = useLanguage();
  const [municipalities, setMunicipalities] = useState([]);

  const getMunicipalitiesListSelect = async (zillaId: string | number) => {
    try {
      const response = await getMunicipalitiesListFromZilla(zillaId);
      const dataArray = response?.data?.data?.municipalities?.map(
        (item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setMunicipalities(dataArray);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    municipalities,
    getMunicipalitiesListSelect,
  };
};
