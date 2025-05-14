import { useState } from 'react';
import { CandidatePaymentStats } from '@type/candidate-info-management/candidate-nomination-payment-table-types';
import { getCandidatePaymentTable } from '@api/candidate-info-management/candidate-nomination-payment-table';
import { mappingPaymentTable } from './mappingPaymentTable';

interface Props {
  electionTypeId: number | string;
  scheduleId: number | string;
}

export const useCandidateNominationPaymentTable = () => {
  const [candidatePaymentTable, setCandidatePaymentTable] =
    useState<CandidatePaymentStats[]>();
  const [loading, setLoading] = useState(false);

  const getCandidatePaymentTableData = async ({
    electionTypeId,
    scheduleId,
  }: Props) => {
    try {
      setLoading(true);
      const response = await getCandidatePaymentTable({
        electionTypeId,
        scheduleId,
      });

      if (response?.data?.status === 200) {
        const mappedData = mappingPaymentTable({
          data: response?.data?.data?.candidatePaymentStats,
        });

        // console.log('HOOK mappedData:', mappedData);

        setCandidatePaymentTable(mappedData);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    candidatePaymentTable,
    getCandidatePaymentTableData,
    loading,
  };
};
