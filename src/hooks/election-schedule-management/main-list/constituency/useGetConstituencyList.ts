import { useState } from 'react';

import { fetchConstituencyLocations } from '@api/election-schedule-management/main-list/constituency-location/constituency-locations';
import {
  ConstituencyFilter,
  ConstituencyType,
} from '@type/election-declaration-management/main-list/constituency/constituency';

export const useGetConstituencyList = () => {
  const [constituencies, setConstituencies] = useState<ConstituencyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getConstituencyList = async ({
    page = 0,
    size = 10,
    constituencyId,
  }: ConstituencyFilter) => {
    setLoading(true);
    try {
      const response = await fetchConstituencyLocations({
        page,
        size,
        constituencyId,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data.constituencyLocations || [];
        setConstituencies(dataArray);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );

        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    constituencies,
    loading,
    activePage,
    totalPage,
    getConstituencyList,
  };
};
