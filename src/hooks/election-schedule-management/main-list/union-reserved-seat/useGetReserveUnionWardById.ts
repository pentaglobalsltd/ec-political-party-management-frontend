import { useState } from 'react';
import { fetchReserveUnionWardById } from '@api/election-schedule-management/main-list/union-reserved-seat/fetch-union-reserved-seat-by-id';
import { GetUnionReservedSeat } from '@type/election-declaration-management/main-list/union-reserved-seat/get-union-reserved-seat-types';

interface UseGetReserveUnionWardById {
  unionWard: GetUnionReservedSeat;
  getReserveUnionWardById: (id: string | number) => void;
}

export const MAPPING_KEY_UNION_WARDS_ARRAY = 'unionWards';

const useGetReserveUnionWardById = (): UseGetReserveUnionWardById => {
  const [unionWard, setUnionWard] = useState<GetUnionReservedSeat>(
    {} as GetUnionReservedSeat,
  );

  const getReserveUnionWardById = async (id: string | number) => {
    try {
      const response = await fetchReserveUnionWardById(id);

      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data;

        const mappedData = {
          ...dataArray,
          [MAPPING_KEY_UNION_WARDS_ARRAY]: dataArray?.unionWards?.map(
            (item) => item.id,
          ),
        };

        setUnionWard(mappedData as GetUnionReservedSeat);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { unionWard, getReserveUnionWardById };
};

export default useGetReserveUnionWardById;
