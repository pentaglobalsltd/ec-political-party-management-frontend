import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ReeditNominationPermission } from '@type/user-management/user-profile-types';
import { postApiRedditNominationPermission } from '@api/user-management-service/election-user/reedit-nomination-permission';

export const useReeditNominationPermission = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const { t } = useTranslation();

  const postReeditNominationPermission = async (
    data: ReeditNominationPermission,
  ) => {
    try {
      setFailed(false);
      setSuccess(false);
      setCreateLoading(true);
      const response = await postApiRedditNominationPermission(data);
      if (response?.data?.status === 200) {
        setCreateLoading(false);
        setSuccess(true);

        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        setCreateLoading(false);
        setFailed(true);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      setCreateLoading(false);
      setFailed(true);
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
    }
  };
  return { postReeditNominationPermission, createLoading, success, failed };
};
