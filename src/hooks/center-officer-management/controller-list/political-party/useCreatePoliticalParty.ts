import { createPoliticalParty } from '@api/center-officer-management/controller-list/political-party/political-party';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useCreatePoliticalParty = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const addPoliticalParty = async (data: any) => {
    setLoading(true);
    try {
      const response = await createPoliticalParty({
        data,
      });
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success('জমা দেয়া সফল হয়েছে');
      } else {
        setLoading(false);
        toast.error('জমা দেয়া সফল হয়নি!');
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return { addPoliticalParty, loading, success };
};
