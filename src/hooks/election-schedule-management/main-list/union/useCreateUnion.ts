import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createUnionOrWard } from '@api/election-schedule-management/main-list/union/unions';
import { CreateUnionData } from '@type/election-declaration-management/main-list/union/union-type';

export const useCreateUnion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const createUnionHandler = async (data: CreateUnionData) => {
    setLoading(true);
    try {
      const response = await createUnionOrWard(data);
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        setError(null);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
        navigate(-1);
      } else {
        setLoading(false);
        setSuccess(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
    }
  };

  return {
    createUnionHandler,
    state: {
      loading,
      error,
      success,
    },
  };
};
