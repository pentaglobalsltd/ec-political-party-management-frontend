import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import {
  PostPostalBallotCenterInfo,
  postPostalBallotCenterInfoApi,
} from '@api/result-management/electoral-process/postal-ballot/postal-ballot-center';

interface HookReturnType {
  postPostalBallotCenter: (obj: PostPostalBallotCenterInfo) => void;
  loading: boolean;
  success: boolean;
}

export const usePostPostalBallotCenter = (): HookReturnType => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const postPostalBallotCenter = async ({
    scheduleId,
    settingsId,
    data,
  }: PostPostalBallotCenterInfo) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await postPostalBallotCenterInfoApi({
        data,
        scheduleId,
        settingsId,
      });
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('POSTAL_BALLOT.SUCCESS_TOAST'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return { postPostalBallotCenter, loading, success };
};
