import { useState } from 'react';
import { fetchInstituteType } from '@api/election-schedule-management/others/institute-type';
import { InstituteType } from '@type/election-declaration-management/others/institute-types/institute-types';

export const useGetInstituteType = () => {
  const [instituteType, setInstituteType] = useState<InstituteType>();

  const getInstituteType = async (id: number) => {
    try {
      const response = await fetchInstituteType(id);
      if (response?.data?.status === 200) {
        const data: InstituteType = response?.data?.data;
        setInstituteType(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    instituteType,
    getInstituteType,
  };
};
