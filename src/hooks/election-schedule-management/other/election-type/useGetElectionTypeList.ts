import { useState } from 'react';
import { ElectionType } from '@type/election-declaration-management/others/election-types/election-types';
import { fetchElectionTypes } from '@api/election-schedule-management/others/election-types';

interface ElectionTypeListParams {
  page?: number;
  size?: number;
}

export const useGetElectionTypeList = () => {
  const [electionTypes, setElectionTypes] = useState<ElectionType[]>([]);
  const [loading, setLoading] = useState(false);
  const size = 10;

  const getElectionTypeList = async ({ page }: ElectionTypeListParams) => {
    setLoading(true);
    try {
      const response = await fetchElectionTypes({ page, size });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data.electionTypes || [];
        setElectionTypes(dataArray);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    electionTypes,
    loading,
    getElectionTypeList,
  };
};
