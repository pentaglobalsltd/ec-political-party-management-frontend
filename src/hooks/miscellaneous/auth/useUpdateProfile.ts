import { useState } from 'react';
import { toast } from 'react-toastify';

import { putUpdateProfile } from '@api/miscellaneous/auth/auth';
import { UpdateProfileTypes } from '@type/auth/auth';

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateProfile = async ({
    data,
    username,
  }: {
    data: UpdateProfileTypes;
    username?: string;
  }) => {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await putUpdateProfile({ data, username });

      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(response?.data?.data);
      } else {
        setLoading(false);
        toast.error(response?.data?.data);
      }
    } catch (error: any) {
      setLoading(false);
      setSuccess(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return { updateProfile, loading, success };
};

export default useUpdateProfile;
