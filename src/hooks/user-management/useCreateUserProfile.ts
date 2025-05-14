import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createUserProfileApi } from '@api/user-management-service/create-user-profile';
import { UserProfiles } from '@type/user-management/user-profile-types';

export const useCreateUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const userProfileCreateData = async (data: UserProfiles) => {
    try {
      setLoading(true);
      const response = await createUserProfileApi(data);
      if (response?.data?.status !== 201) {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      } else {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return { userProfileCreateData, loading, success };
};
