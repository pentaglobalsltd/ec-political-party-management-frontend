import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { createResultByCandidate } from '@api/result-management/submit-results/result-by-candidates';

export const useCreateResultByCandidate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const addResultByCandidate = async (data: any) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await createResultByCandidate({
        data,
      });
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('SUBMIT_RESULTS.SUCCESS_TOAST'));
      } else {
        setLoading(false);
        toast.error('জমা দেয়া সফল হয়নি!');
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return { addResultByCandidate, loading, success };
};
