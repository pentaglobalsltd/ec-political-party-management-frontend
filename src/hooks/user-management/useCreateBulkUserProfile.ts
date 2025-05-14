import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { BulkUserProfiles } from '@type/user-management/user-profile-types';
import { createBulkUserProfileApi } from '@api/user-management-service/create-bulk-user-profile';

export const useCreateBulkUserProfile = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const { t } = useTranslation();

  const bulkUserProfilesUserData = async (data: BulkUserProfiles) => {
    try {
      setFailed(false);
      setSuccess(false);
      setCreateLoading(true);
      const response = await createBulkUserProfileApi(data);
      if (response?.data?.status !== 201) {
        setCreateLoading(false);
        setFailed(true);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      } else {
        setCreateLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      }
    } catch (error: any) {
      setCreateLoading(false);
      setFailed(true);
      toast.error(error?.response?.data?.message);
    }
  };
  return { bulkUserProfilesUserData, createLoading, success, failed };
};
