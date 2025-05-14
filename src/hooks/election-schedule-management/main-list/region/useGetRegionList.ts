import { useState } from 'react';
import { RegionType } from '@type/election-declaration-management/main-list/division/divison-types';
import { getRegions } from '@api/election-schedule-management/main-list/region/regions';

interface RegionParams {
  page?: number;
  size?: number;
  regionIds?: string;
}

export const useGetRegionList = () => {
  const [regions, setRegions] = useState<RegionType[]>([]);
  const [loading, setLoading] = useState(false);

  const getRegionList = async ({
    page = 0,
    size = 10,
    regionIds,
  }: RegionParams) => {
    setLoading(true);
    try {
      await getRegions({ page, size, regionIds }).then((response) => {
        if (response?.data?.status === 200) {
          const dataArray = response?.data?.data.regions || [];
          setRegions(dataArray);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    regions,
    loading,
    getRegionList,
  };
};
