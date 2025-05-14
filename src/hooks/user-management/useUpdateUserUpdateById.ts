import { useState } from 'react';
import { toast } from 'react-toastify';
import { apiUpdateUserProfileById } from '@api/user-management-service/update-user-profile-by-id';
import { UserProfiles } from '@type/user-management/user-profile-types';
import { useTranslation } from 'react-i18next';

interface Props {
  data: UserProfiles;
  userId: string | number;
}

const useUpdateUserProfileById = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { t } = useTranslation();

  const updateUserProfileById = async ({ userId, data }: Props) => {
    try {
      setUpdateLoading(true);
      const response = await apiUpdateUserProfileById({
        userId,
        data,
      });
      if (response?.data?.status !== 200) {
        setUpdateLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      } else {
        setUpdateLoading(false);
        setUpdateSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      }
    } catch (error: any) {
      setUpdateLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    updateUserProfileById,
    updateLoading,
    updateSuccess,
    setUpdateSuccess,
  };
};

export default useUpdateUserProfileById;
