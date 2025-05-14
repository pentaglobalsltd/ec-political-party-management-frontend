import { useState } from 'react';
import { fetchOfficer } from '@api/center-officer-management/controller-list/officer-list/officer-list';

export const useGetOfficer = () => {
  const [officer, setOfficer] = useState({});

  const getOfficer = async (id: string | number) => {
    let modifiedOfficer = {} as any;
    try {
      const response = await fetchOfficer(id);
      if (response?.data?.status === 200) {
        const data = response?.data?.data || {};
        if (Object.keys(data).length !== 0) {
          modifiedOfficer = {
            ...data,
            regionId: data?.agency?.regionId,
            zillaId: data?.agency?.zillaId,
            upazilaId: data?.agency?.upazilaId,
            rmo: data?.agency?.rmoEn,
            municipilityId: data?.agency?.municipilityId,
            unionOrWordId: data?.agency?.unionOrWordId,
            agencyId: data?.agency?.id,
            payScaleId: data?.payScale?.id,
            personalZillaId: data?.personalZilla?.id,
          };
        }

        setOfficer(modifiedOfficer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    officer,
    getOfficer,
  };
};
