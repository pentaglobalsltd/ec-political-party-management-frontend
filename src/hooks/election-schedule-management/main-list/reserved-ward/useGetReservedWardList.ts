import { useState } from 'react';
import { fetchReservedWardList } from '@api/election-schedule-management/main-list/reserved-ward/reserved-ward';
import {
  ReservedWardType,
  ReservedWardTypeListParams,
} from '@type/election-declaration-management/main-list/reserved-ward/reserved-ward-types';
import { getDigitBanglaFromEnglish } from '@utils';

const mapReservedWards = (data: any) => {
  return {
    ...data,
    code: getDigitBanglaFromEnglish(data?.code),
    unionOrWards: data?.unionOrWards.map((obj: any) => obj.nameBn).join(', '),
  };
};

export const useGetReservedWardList = () => {
  const [reservedWardList, setReservedWardList] = useState<ReservedWardType[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getReservedWardList = async ({
    page,
    size = 10,
    code,
    municipalityId,
  }: ReservedWardTypeListParams) => {
    setLoading(true);
    try {
      const response = await fetchReservedWardList({
        page,
        size,
        code,
        municipalityId,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.reservedWards?.map((item: ReservedWardType) =>
            mapReservedWards(item),
          ) || [];
        setReservedWardList(dataArray);

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
    reservedWardList,
    loading,
    activePage,
    totalPage,
    getReservedWardList,
  };
};
