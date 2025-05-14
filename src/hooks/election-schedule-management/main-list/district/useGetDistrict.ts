import { useState } from 'react';
import { ZillaType } from '@type/election-declaration-management/main-list/zilla/zilla-type';
import { fetchZilla } from '@api/election-schedule-management/main-list/district/district';

export const useGetDistrict = () => {
  const [district, setDistrict] = useState<ZillaType>();

  const getDistrict = async (id: string | number) => {
    try {
      const response = await fetchZilla(id);
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data;
        setDistrict(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    district,
    getDistrict,
  };
};
