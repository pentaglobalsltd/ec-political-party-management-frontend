import { useState } from 'react';
import {
  GetUnionWardType,
  UnionWardQueryParams,
} from '@type/election-declaration-management/main-list/union-ward/union-ward-type';
import { fetchUnionsWards } from '@api/election-schedule-management/main-list/union-ward/fetchUnionWardsList';

export const useGetUnionWardList = () => {
  const [unionsWardsList, setUnionsWardsList] = useState<GetUnionWardType[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getUnionsWardsList = async ({
    page = 0,
    size = 10,
    upazilaId,
    unionOrWardId,
    unionWardCode,
    nameBn,
    nameEn,
  }: UnionWardQueryParams) => {
    setLoading(true);
    try {
      const response = await fetchUnionsWards({
        page,
        size,
        upazilaId,
        unionId: unionOrWardId,
        unionWardCode,
        nameBn,
        nameEn,
      });
      if (response?.data?.status === 200 && response?.data?.data?.unionWards) {
        const dataArray = response?.data?.data?.unionWards;
        setUnionsWardsList(dataArray);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );

        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    unionsWardsList,
    loading,
    activePage,
    totalPage,
    getUnionsWardsList,
  };
};
