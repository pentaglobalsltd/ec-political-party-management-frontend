import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchMunicipalities } from '@api/election-schedule-management/main-list/municipality/municipalities';
import { MunicipalitiesFilter } from '@type/election-declaration-management/main-list/municipality/municipality-type';

export const useMunicipalityListSelect = () => {
  const { language } = useLanguage();
  const [municipalities, setMunicipalities] = useState([]);

  const getMunicipalityListSelect = async ({
    districtId,
    rmoEn,
  }: MunicipalitiesFilter) => {
    try {
      const response = await fetchMunicipalities({ districtId, rmoEn });
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
    getMunicipalityListSelect,
  };
};
