import { useState } from 'react';
import { getZillas } from '@api/election-schedule-management/main-list/district/district';
import { ZillaType } from '@type/election-declaration-management/main-list/zilla/zilla-type';

interface DistrictParams {
  page?: number;
  size?: number;
  zillaIds?: string;
}

export const useGetDistrictList = () => {
  const [districts, setDistricts] = useState<ZillaType[]>([]);
  const [loading, setLoading] = useState(false);

  const getDistrictList = async ({
    page = 0,
    size = 10,
    zillaIds,
  }: DistrictParams) => {
    setLoading(true);
    try {
      const response = await getZillas({ page, size, zillaIds });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data.zillas || [];
        setDistricts(dataArray);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return {
    districts,
    loading,
    getDistrictList,
  };
};
