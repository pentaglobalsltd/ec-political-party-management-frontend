import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { createPollingCenterApi } from '@api/vote-center-management/center-management/polling-center-list/create-polling-center';
import { CreatePollingCenterApi } from '@type/vote-center-management/create-polling-center-types';

export type CreatePollingCenterType = ({
  electionSettingsId,
  unionOrWardId,
  reqBody,
}: CreatePollingCenterApi) => void;

interface HookReturnType {
  createPollingCenter: CreatePollingCenterType;

  loading: boolean;
  success: boolean;
}

const useCreatePollingCenter = (): HookReturnType => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const createPollingCenter = async ({
    electionSettingsId,
    unionOrWardId,
    reqBody,
  }: CreatePollingCenterApi) => {
    try {
      setLoading(true);

      const response = await createPollingCenterApi({
        electionSettingsId,
        unionOrWardId,
        reqBody,
      });
      if (response?.data?.status === 200) {
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  return { createPollingCenter, loading, success };
};

export default useCreatePollingCenter;
