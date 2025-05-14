import { fetchUpdatePoliticalParty } from '@api/center-officer-management/controller-list/political-party/political-party';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useUpdatePoliticalParty = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const updatePoliticalParty = async (id: string | number, data: any) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetchUpdatePoliticalParty(id, data);
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success('জমা দেয়া সফল হয়েছে');
      } else {
        setLoading(false);
        toast.error('জমা দেয়া সফল হয়নি!!');
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return { updatePoliticalParty, loading, success };
};
