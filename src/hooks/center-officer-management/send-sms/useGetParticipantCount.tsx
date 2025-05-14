import { useState } from 'react';
import {
  FetchParticipantCount,
  fetchParticipantCount,
} from '@api/center-officer-management/send-sms/participant-count';

interface HookReturnType {
  count: number;
  getParticipantCount: (obj: FetchParticipantCount) => void;
  loading: boolean;
  success: boolean;
}

export const useGetParticipantCount = (): HookReturnType => {
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const getParticipantCount = async ({
    electionScheduleId,
    userTypeCode,
  }: FetchParticipantCount) => {
    try {
      setLoading(true);
      setSuccess(false);

      const response = await fetchParticipantCount({
        electionScheduleId,
        userTypeCode,
      });

      if (response?.data?.status === 200) {
        const data = response?.data?.data || {};

        setCount(data?.value || 0);
        setLoading(false);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    count,
    getParticipantCount,
    loading,
    success,
  };
};
