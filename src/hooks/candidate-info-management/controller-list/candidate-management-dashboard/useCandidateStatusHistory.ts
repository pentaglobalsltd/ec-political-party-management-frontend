import { useState } from 'react';
import { candidateStatusHistory } from '@api/candidate-info-management/candidateStatusHistory';

interface CandidateStatusHistoryProps {
  id: number | string;
  detailsId: number | string;
}

interface Props {
  isStatusHistoryLoading: boolean;
  statusHistoryList: any;
  getCandidateStatusHistoryListData: ({
    id,
    detailsId,
  }: CandidateStatusHistoryProps) => void;
}

export const useCandidateStatusHistory = (): Props => {
  const [statusHistoryList, setStatusHistoryList] = useState<any[]>([]);
  const [isStatusHistoryLoading, setIsStatusHistoryLoading] = useState(false);

  const getCandidateStatusHistoryListData = async ({
    id,
    detailsId,
  }: CandidateStatusHistoryProps) => {
    try {
      setIsStatusHistoryLoading(true);

      const response = await candidateStatusHistory({
        id,
        detailsId,
      });
      if (response?.data?.status === 200) {
        setStatusHistoryList(response?.data?.data || []);
        setIsStatusHistoryLoading(false);
      } else {
        setIsStatusHistoryLoading(false);
      }
    } catch (error) {
      setIsStatusHistoryLoading(false);
    }
  };

  return {
    isStatusHistoryLoading,
    statusHistoryList,
    getCandidateStatusHistoryListData,
  };
};
