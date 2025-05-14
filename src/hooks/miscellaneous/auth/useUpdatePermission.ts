import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { updateEditPermission } from '@api/miscellaneous/auth/auth';
import { ReEditPermissionType } from '@type/auth/auth';

const useUpdatePermission = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const updatePermission = async (data: ReEditPermissionType) => {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await updateEditPermission(data);

      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setLoading(false);
      setSuccess(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };

  return { updatePermission, loading, success };
};

export default useUpdatePermission;
