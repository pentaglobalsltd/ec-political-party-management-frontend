import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ElectionMigrateCreateTypes } from '@type/election-declaration-management/election/election-migrate/election-migrate-types';
import { createElectionMigrate } from '@api/election-schedule-management/election/election-migrate/election-migrate';

export const useCreateElectionMigrate = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const electionMigrateCreate = async ({
    data,
    electionScheduleId,
  }: {
    data: ElectionMigrateCreateTypes;
    electionScheduleId: string | number;
  }) => {
    try {
      const response = await createElectionMigrate({
        data,
        electionScheduleId,
      });
      if (response?.data?.status !== 201) {
        setLoading(true);
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
  return { electionMigrateCreate, loading, success };
};
