import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateInstituteType } from '@api/election-schedule-management/others/institute-type';

export const useUpdateInstituteType = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const editInstituteType = async (id: number, data: any) => {
    setLoading(true);
    try {
      const response = await updateInstituteType(id, data);
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success('জমা দেয়া সফল হয়েছে');
      } else {
        setLoading(false);
        toast.error('জমা দেয়া সফল হয়নি!!');
      }
    } catch (error) {
      toast.error('জমা দেয়া সফল হয়নি!!');
      setLoading(false);
    }
  };
  return { editInstituteType, loading, success };
};
