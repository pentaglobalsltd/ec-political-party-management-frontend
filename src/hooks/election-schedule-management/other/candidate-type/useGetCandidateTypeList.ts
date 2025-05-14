import { useState } from 'react';
import { fetchCandidateTypeList } from '@api/election-schedule-management/others/candidate-types';
import { CandidateType } from '@type/election-declaration-management/others/candidate-types/candidate-types';

interface CandidateTypeListParams {
  page?: number;
  size?: number;
}

export const useGetCandidateTypeList = () => {
  const [candidateTypes, setCandidateTypes] = useState<CandidateType[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getCandidateTypeList = async ({
    page = 0,
    size = 10,
  }: CandidateTypeListParams) => {
    setLoading(true);
    try {
      const response = await fetchCandidateTypeList({ page, size });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data.candidateTypes || [];
        setCandidateTypes(dataArray);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );

        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    candidateTypes,
    loading,
    activePage,
    totalPage,
    getCandidateTypeList,
  };
};
