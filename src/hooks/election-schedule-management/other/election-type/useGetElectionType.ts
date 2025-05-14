import { useState } from 'react';
import { fetchElectionType } from '@api/election-schedule-management/others/election-types';
import { ElectionType } from '@type/election-declaration-management/others/election-types/election-types';

export const useGetElectionType = () => {
  const [electionType, setElectionType] = useState<ElectionType>();

  const getElectionType = async (id: number) => {
    try {
      const response = await fetchElectionType(id);
      if (response?.data?.status === 200) {
        const data: ElectionType = response?.data?.data;
        setElectionType(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    electionType,
    getElectionType,
  };
};
