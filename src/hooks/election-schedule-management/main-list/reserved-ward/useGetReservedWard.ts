import { useState } from 'react';
import { ReservedWardType } from '@type/election-declaration-management/main-list/reserved-ward/reserved-ward-types';
import { fetchReservedWard } from '@api/election-schedule-management/main-list/reserved-ward/reserved-ward';
import { rmos } from '@containers/election-declaration-management/main-list/reserved-seat-list/ReservedSeat/constants';

export const useGetReservedWard = () => {
  const [reservedWard, setReservedWard] = useState<ReservedWardType>();

  const getReservedWard = async (id: string | number) => {
    try {
      const response = await fetchReservedWard(id);
      if (response?.data?.status === 200) {
        const unionOrWardsIds: number[] = [];
        const modifiedData = response?.data?.data;
        if (Object.keys(modifiedData).length !== 0) {
          modifiedData?.unionOrWards?.forEach((item: any) => {
            unionOrWardsIds.push(item.municipalityWardId);
          });
          modifiedData.municipalityWardIds = unionOrWardsIds;
          // eslint-disable-next-line array-callback-return
          modifiedData.rmo = rmos.find((obj: any) => {
            if (obj?.label === modifiedData?.rmo) {
              return true;
            }
          })?.value;
          modifiedData.isActive = modifiedData?.isActive === true ? 1 : 2;
        }
        setReservedWard(modifiedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    reservedWard,
    getReservedWard,
  };
};
