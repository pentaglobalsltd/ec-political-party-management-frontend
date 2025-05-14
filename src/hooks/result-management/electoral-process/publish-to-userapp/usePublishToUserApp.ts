import { useState } from 'react';
import { toast } from 'react-toastify';

import { createPublishToUserApp } from '@api/result-management/electoral-process/publish-to-user-app/publish-to-userapp';
import { PublishToUserAppRequestType } from '@type/result-management/electoral-process/publish-to-user-app/publish-to-user-app-types';

const usePublishToUserApp = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const addPublishToUserApp = async ({
    electionScheduleId,
    electionSettingsId,
    data,
  }: PublishToUserAppRequestType) => {
    try {
      setPublishLoading(true);
      setPublishSuccess(false);
      const response: any = await createPublishToUserApp({
        electionScheduleId,
        electionSettingsId,
        data,
      });
      if (response?.data?.status !== 200) {
        toast.error(response?.data?.data?.message);
        setPublishLoading(false);
      } else {
        setPublishLoading(false);
        setPublishSuccess(true);
        toast.success(response?.data?.data?.message);
      }
    } catch (error: any) {
      setPublishLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    addPublishToUserApp,
    publishLoading,
    publishSuccess,
  };
};

export default usePublishToUserApp;
