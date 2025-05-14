import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { UserActivationStatus } from '@type/user-management/user-profile-types';
import { apiUserActivationStatus } from '@api/user-management-service/user-activation-status';

interface Props {
  data: UserActivationStatus;
  userId: string | number;
}

const useUserActivationStatus = () => {
  const [activationStatusLoading, setActivationStatusLoading] = useState(false);
  const [activationStatusSuccess, setActivationStatusSuccess] = useState(false);
  const { t } = useTranslation();

  const updateUserActivationStatus = async ({ userId, data }: Props) => {
    try {
      setActivationStatusLoading(true);
      const response = await apiUserActivationStatus({
        userId,
        data,
      });
      if (response?.data?.status !== 200) {
        setActivationStatusLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      } else {
        setActivationStatusLoading(false);
        setActivationStatusSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      }
    } catch (error) {
      setActivationStatusLoading(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };

  return {
    updateUserActivationStatus,
    activationStatusLoading,
    activationStatusSuccess,
    setActivationStatusSuccess,
  };
};

export default useUserActivationStatus;
