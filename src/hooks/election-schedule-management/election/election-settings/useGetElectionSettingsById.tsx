import { useEffect, useState } from 'react';
import { apiGetElectionSettingsById } from '@api/election-schedule-management/election/election-settings/get-election-settings-by-id';
import { mapElectionSettings } from './useElectionSettingsAggregated';
import { useLanguage } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { ElectionSettingsAggregatedType } from '@type/election-declaration-management/election/election-settings/election-settings-types';

interface HookReturnType {
  currentElectionSettings: ElectionSettingsAggregatedType;
  getElectionSettingsByIdData: () => void;
}

const useGetElectionSettingsById = (
  electionSettingsId: string | number | undefined,
): HookReturnType => {
  const { language } = useLanguage();

  const [currentElectionSettings, setCurrentElectionSettings] =
    useState<ElectionSettingsAggregatedType>(
      {} as ElectionSettingsAggregatedType,
    );

  const getElectionSettingsByIdData = async () => {
    if (electionSettingsId) {
      try {
        // setLoading(true);
        const response = await apiGetElectionSettingsById(electionSettingsId);
        if (response?.data?.status === 200) {
          const newData = mapElectionSettings(response?.data?.data, language);

          setCurrentElectionSettings(newData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (electionSettingsId) {
      getElectionSettingsByIdData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsId, language]);

  return {
    currentElectionSettings,
    getElectionSettingsByIdData,
  };
};

export default useGetElectionSettingsById;
