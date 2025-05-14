import { useState } from 'react';
import { fetchUnionsWard } from '@api/election-schedule-management/main-list/union-ward/fetchUnionWard';
import { GetUnionWardType } from '@type/election-declaration-management/main-list/union-ward/union-ward-type';

export const useGetUnionWard = () => {
  const [unionWard, setUnionWard] = useState<GetUnionWardType>({});

  const getUnionWard = async (id: string | number) => {
    try {
      const response = await fetchUnionsWard({ id });

      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data;
        setUnionWard(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    unionWard,
    getUnionWard,
  };
};
