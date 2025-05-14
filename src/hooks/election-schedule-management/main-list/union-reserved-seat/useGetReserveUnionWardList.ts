import { useState } from 'react';
import {
  fetchReserveUnionWardList,
  ReserveUnionWardQueryParams,
} from '@api/election-schedule-management/main-list/union-reserved-seat/fetch-union-reserved-seat-listing';
import { GetUnionReservedSeat } from '@type/election-declaration-management/main-list/union-reserved-seat/get-union-reserved-seat-types';
import { useLanguage } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { mappingReserveWardList } from './mappingReserveWardList';

interface HookReturnType {
  loading: boolean;
  totalPage: number;
  activePage: number;
  reserveUnionWardList: GetUnionReservedSeat[];
  getReserveUnionWardList: (queryParams: ReserveUnionWardQueryParams) => void;
}

const useGetReserveUnionWardList = (): HookReturnType => {
  const { language } = useLanguage();

  const [reserveUnionWardList, setReserveUnionWardList] = useState<
    GetUnionReservedSeat[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getReserveUnionWardList = async (
    queryParams: ReserveUnionWardQueryParams,
  ) => {
    try {
      const { page = 0, size = 10 } = queryParams;
      const response = await fetchReserveUnionWardList({
        ...queryParams,
        page: queryParams?.page ?? page,
        size: queryParams?.size ?? size,
      });

      if (response?.data?.status === 200) {
        const result = response?.data?.data;

        const mappedData = mappingReserveWardList({
          data: result?.unionReservedWards || [],
          language,
        });

        setReserveUnionWardList((mappedData || []) as GetUnionReservedSeat[]);

        setActivePage((result?.page && result?.page + 1) || 1);

        if (result?.total) {
          setTotalPage(Math.ceil(result?.total / size));
        }

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    loading,
    totalPage,
    activePage,
    reserveUnionWardList,
    getReserveUnionWardList,
  };
};

export default useGetReserveUnionWardList;
