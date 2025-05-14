import { useState } from 'react';
import { fetchMunicipality } from '@api/election-schedule-management/main-list/municipality/municipalities';
import { MunicipalityType } from '@type/election-declaration-management/main-list/municipality/municipality-type';

export const useGetMunicipality = () => {
  const [municipality, setMunicipality] = useState<MunicipalityType>();

  const getMunicipality = async (id: string | number) => {
    try {
      const response = await fetchMunicipality(id);
      if (response?.data?.status === 200) {
        const upazilaIds: number[] = [];
        const modifiedData = response?.data?.data;
        if (Object.keys(modifiedData).length !== 0) {
          modifiedData?.upazilas?.forEach((item: any) => {
            upazilaIds.push(item.id);
          });
          modifiedData.upazilaIds = upazilaIds;
        }
        setMunicipality(modifiedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    municipality,
    getMunicipality,
  };
};
