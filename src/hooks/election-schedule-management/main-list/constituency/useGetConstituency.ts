import { useState } from 'react';
import { fetchConstituencyLocation } from '@api/election-schedule-management/main-list/constituency-location/constituency-locations';

export const useGetConstituency = () => {
  const [constituency, setConstituency] = useState({});

  const getConstituency = async (id: number) => {
    try {
      const response = await fetchConstituencyLocation(id);
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data;
        setConstituency(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    constituency,
    getConstituency,
  };
};
