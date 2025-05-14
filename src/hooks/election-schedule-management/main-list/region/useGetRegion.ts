import { useState } from 'react';
import { fetchRegion } from '@api/election-schedule-management/main-list/region/regions';
import { RegionType } from '@type/election-declaration-management/main-list/division/divison-types';

export const useGetRegion = () => {
  const [region, setRegion] = useState<RegionType>();

  const getRegion = async (id: string | number) => {
    try {
      await fetchRegion(id).then((response) => {
        if (response?.data?.status === 200) {
          const dataArray = response?.data?.data;
          setRegion(dataArray);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    region,
    getRegion,
  };
};
