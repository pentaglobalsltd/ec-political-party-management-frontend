import { useState } from 'react';
import { fetchSubDistrict } from '@api/election-schedule-management/main-list/sub-district/sub-districts';
import { SubDistrictType } from '@type/election-declaration-management/main-list/sub-district/sub-district-types';

export const useGetSubdistrict = () => {
  const [subdistrict, setSubdistrict] = useState<SubDistrictType>();

  const getSubdistrict = async (id: string | number) => {
    try {
      const response = await fetchSubDistrict(id);
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data;
        setSubdistrict(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    subdistrict,
    getSubdistrict,
  };
};
