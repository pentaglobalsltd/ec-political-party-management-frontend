import { useState } from 'react';
import { getPollingInstituteById } from '@api/vote-center-management/center-management/polling-institute/get-polling-institute-by-id';

const mappedData = (data: any) => {
  return {
    ...data,
    region: data?.region?.id,
    zilla: data?.zilla?.id,
    upazila: data?.upazila?.id,
    municipality: data?.municipality?.id,
    unionOrWardId: data?.unionOrWard?.id,
    unionWardId: data?.unionWard?.id,
    instituteTypeId: data?.instituteType?.id,
    buildingTypeId: data?.buildingType?.id,
    surroundings:
      data?.surroundings === 'NaN' || data?.surroundings === null
        ? ''
        : data?.surroundings,
    distanceFromCenter:
      data?.distanceFromCenter === '' || data?.distanceFromCenter === null
        ? ''
        : data?.distanceFromCenter,
    waysToReach:
      data?.waysToReach === 'NaN' || data?.waysToReach === null
        ? ''
        : data?.waysToReach,
    comments:
      data?.comments === 'NaN' || data?.comments === null ? '' : data?.comments,
  };
};

const useGetPollingInstituteById = () => {
  const [pollingInstituteById, setPollingInstituteById] = useState<any>({});

  const getPollingInstituteByIdData = async (id: string | number) => {
    if (id) {
      try {
        const response = await getPollingInstituteById(id);
        if (response?.data?.status === 200) {
          const data = mappedData(response?.data?.data);

          setPollingInstituteById(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    pollingInstituteById,
    getPollingInstituteByIdData,
  };
};

export default useGetPollingInstituteById;
