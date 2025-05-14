import { useState } from 'react';
import { toast } from 'react-toastify';
import { createPublishToDashboard } from '@api/result-management/electoral-process/publish-to-dashboard/publish-to-dashboard';

export interface PublishToDashboardRequestType {
  electionScheduleId?: string | number;
  electionSettingsId?: string | number;
  data?: {};
}

const usePublishToDashboard = () => {
  const [publishDashboardLoading, setPublishDashboardLoading] = useState(false);
  const [publishDashboardSuccess, setPublishDashboardSuccess] = useState(false);

  const createPublishToDashboardData = async ({
    electionScheduleId,
    electionSettingsId,
    data,
  }: PublishToDashboardRequestType) => {
    try {
      setPublishDashboardLoading(true);
      setPublishDashboardSuccess(false);
      const response: any = await createPublishToDashboard({
        electionScheduleId,
        electionSettingsId,
        data,
      });
      if (response?.data?.status !== 200) {
        setPublishDashboardLoading(false);
      } else {
        setPublishDashboardLoading(false);
        setPublishDashboardSuccess(true);
        toast.success(response?.data?.data?.message);
      }
    } catch (error: any) {
      setPublishDashboardLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    createPublishToDashboardData,
    publishDashboardLoading,
    publishDashboardSuccess,
  };
};

export default usePublishToDashboard;
