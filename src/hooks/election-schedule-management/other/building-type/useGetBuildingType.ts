import { fetchBuildingType } from '@api/election-schedule-management/main-list/building-type/building-type';
import { useState } from 'react';

export const useGetBuildingType = () => {
  const [buildingType, setBuildingType] = useState({});

  const getBuildingType = async (id: string | number) => {
    try {
      const response = await fetchBuildingType(id);
      if (response?.data?.status === 200) {
        const data = response?.data?.data || {};
        setBuildingType(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    buildingType,
    getBuildingType,
  };
};
