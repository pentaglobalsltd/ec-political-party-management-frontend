import { useState } from 'react';
import { fetchGetVoterAreaById } from '@api/vote-center-management/main-list/voter-area/get-voter-area-by-id';
import { VoterAreaType } from '@type/vote-center-management/voter-area-type';

function mapVoterArea(data: VoterAreaType) {
  return {
    ...data,
    zillaId: data?.zilla?.id,
    upazilaId: data?.upazila?.id,
    municipalityId: data?.municipality?.id,
    unionOrWardId: data?.unionOrWard?.id,
    unionWardId: data?.unionWard?.id,
  };
}
const useGetVoterAreaById = () => {
  const [voterAreaData, setVoterAreaData] = useState<VoterAreaType>(
    {} as VoterAreaType,
  );

  const getVoterAreaByIdData = async (id: string | number) => {
    if (id) {
      try {
        const response = await fetchGetVoterAreaById(id);
        if (response?.data?.status === 200) {
          const data = mapVoterArea(response?.data?.data);
          setVoterAreaData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    voterAreaData,
    getVoterAreaByIdData,
  };
};

export default useGetVoterAreaById;
