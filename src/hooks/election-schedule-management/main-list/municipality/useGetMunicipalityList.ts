import { useState } from 'react';

import {
  MunicipalitiesFilter,
  MunicipalityType,
} from '@type/election-declaration-management/main-list/municipality/municipality-type';
import { fetchMunicipalities } from '@api/election-schedule-management/main-list/municipality/municipalities';

export const useGetMunicipalityList = () => {
  const [municipalities, setMunicipalities] = useState<MunicipalityType[]>([]);
  const [loading, setLoading] = useState(false);

  const getMunicipalityList = async ({
    size = 10,
    page,
    municipalityIds,
  }: MunicipalitiesFilter) => {
    setLoading(true);
    try {
      const response = await fetchMunicipalities({
        page,
        size,
        municipalityIds,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data.municipalities || [];
        setMunicipalities(dataArray);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    municipalities,
    loading,
    getMunicipalityList,
  };
};
