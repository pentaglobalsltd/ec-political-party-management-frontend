import { useState } from 'react';
import { toast } from 'react-toastify';
import { createInstituteType } from '@api/election-schedule-management/others/institute-type';
import { InstituteType } from '@type/election-declaration-management/others/institute-types/institute-types';

export const useCreateInstituteType = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const addInstituteType = async (data: InstituteType) => {
    setLoading(true);
    try {
      const response = await createInstituteType({
        data,
      });
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success('জমা দেয়া সফল হয়েছে');
      } else {
        toast.error('জমা দেয়া সফল হয়নি!!');
        setLoading(false);
      }
    } catch {
      toast.error('জমা দেয়া সফল হয়নি!!');
      setLoading(false);
    }
  };
  return { addInstituteType, loading, success };
};
