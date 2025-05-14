import { getUpdateProfile } from '@api/miscellaneous/auth/auth';
import { UpdateProfileTypes } from '@type/auth/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useGetUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profileData, setProfileData] = useState<UpdateProfileTypes>();
  const getUpdateProfileData = async ({ username }: { username?: string }) => {
    setLoading(true);
    setError(false);

    try {
      const response = await getUpdateProfile({ username });

      if (response?.data?.status === 200) {
        setLoading(false);
        setError(false);
        setProfileData(response?.data?.data);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error: any) {
      setLoading(false);
      setError(true);
      toast.error(error?.response?.data?.message);
    }
  };

  return { getUpdateProfileData, loading, error, profileData };
};

export default useGetUpdateProfile;
