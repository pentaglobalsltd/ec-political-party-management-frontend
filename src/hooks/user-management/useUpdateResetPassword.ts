import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { UserProfiles } from '@type/user-management/user-profile-types';
import { apiUpdateUserPassword } from '@api/user-management-service/update-user-reset-password';

interface Props {
  data: UserProfiles;
  userId: string | number;
}

const useUpdateUserResetPassword = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { t } = useTranslation();

  const updateUserResetPassword = async ({ userId, data }: Props) => {
    try {
      setUpdateLoading(true);
      const response = await apiUpdateUserPassword({
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
    } catch {
      setUpdateLoading(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };

  return {
    updateUserResetPassword,
    updateLoading,
    updateSuccess,
    setUpdateSuccess,
  };
};

export default useUpdateUserResetPassword;
