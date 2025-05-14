import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
    postPublishToApp,
  } from '../../../../api/vote-center-management/center-management/polling-institute/publish-to-app';

interface usePublishToAppTypes {
  success: boolean;
  loading: boolean;
  getPublishToAppData: () => void;
}

const usePublishToApp = (): usePublishToAppTypes => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const getPublishToAppData = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await postPublishToApp();
      if (response?.data?.status === 200) {
          setLoading(false);
          setSuccess(true);
          toast.success(t('TOAST_MESSAGE.DATA_PUBLISHED_SUCCESS'));
      } else {
        setLoading(false);
        setSuccess(false);
        toast.error(t('TOAST_MESSAGE.DATA_PUBLISHED_ERROR'));
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      toast.error(t('TOAST_MESSAGE.DATA_PUBLISHED_ERROR'));
    }
  };

  return {
    success,
    loading,
    getPublishToAppData,
  };
};

export default usePublishToApp;
