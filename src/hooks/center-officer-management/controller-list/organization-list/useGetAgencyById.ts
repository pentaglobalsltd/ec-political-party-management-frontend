import { useState } from 'react';
import { GetAgencyProps } from '@type/center-officer-management/organization-list';
import { getAgencyByIdApi } from '@api/center-officer-management/controller-list/organization-list/get-agency-by-id';

const useGetAgencyById = () => {
  const [agency, setAgency] = useState<GetAgencyProps>();
  function mapAgency(data: GetAgencyProps) {
    return {
      ...data,
      agencyTypeId: data?.agencyType?.id,
      isActive: data?.isActive === true ? 'active' : 'inactive',
    };
  }
  const getAgencyByIdData = async (id: string | number) => {
    if (id) {
      try {
        const response = await getAgencyByIdApi(id);
        if (response?.data?.status === 200) {
          const data = mapAgency(response?.data?.data);
          setAgency(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    agency,
    getAgencyByIdData,
  };
};

export default useGetAgencyById;
