import { fetchPoliticalParty } from '@api/center-officer-management/controller-list/political-party/political-party';
import { useState } from 'react';

export const useGetPoliticalParty = () => {
  const [politicalParty, setPoliticalParty] = useState<any>({});

  const getPoliticalParty = async (id: string | number) => {
    try {
      const response = await fetchPoliticalParty(id);
      if (response?.data?.status === 200) {
        setPoliticalParty(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    politicalParty,
    getPoliticalParty,
  };
};
