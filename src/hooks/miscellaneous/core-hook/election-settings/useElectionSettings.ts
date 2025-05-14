import { useState } from 'react';
import { OptionType } from '@pentabd/ui/build/atoms/select/types';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetElectionSettings } from '@api/miscellaneous/core-api/election-settings/election-settings';
import {
  ElectionSettingsType,
  ElectionSettingsSearchProps,
} from '@type/election-settings-types';

import { ELECTION_INFO } from '@constants/election-info';

interface ElectionSettingsHookProps {
  searchItems: ElectionSettingsSearchProps;
  page?: number;
  size?: number;
}

interface HookReturnType {
  getElectionSettingsData: ({
    searchItems,
    page,
    size,
  }: ElectionSettingsHookProps) => void;
  electionSettingsList: OptionType[];
  loading: boolean;
}

export const mapElectionSettings = (
  item: ElectionSettingsType,
  language: string | null,
) => {
  if (item?.electionTypeId === ELECTION_INFO.UPAZILLA.ID) {
    return {
      label:
        language === LANGUAGE.BANGLA
          ? `${item?.nameBn} - ${item?.candidateTypeName}`
          : `${item?.nameEn} - ${item?.candidateTypeName}`,
      value: item?.id,
    };
  } else {
    return {
      label: language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
      value: item?.id,
    };
  }
};

const useGetElectionSettings = (): HookReturnType => {
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [electionSettingsList, setElectionSettingsList] = useState<
    OptionType[]
  >([]);

  const getElectionSettingsData = async ({
    page = 0,
    size = 1_000, // by default, sends 100 from backend
    searchItems,
  }: ElectionSettingsHookProps) => {
    try {
      setLoading(true);

      const response = await apiGetElectionSettings({
        searchItems,
        page,
        size,
      });
      const dataArray: any =
        response?.data?.data?.electionSettings?.map(
          (item: ElectionSettingsType) => mapElectionSettings(item, language),
        ) || [];

      if (response?.data?.status === 200) {
        setElectionSettingsList(dataArray);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getElectionSettingsData,
    electionSettingsList,
    loading,
  };
};

export default useGetElectionSettings;
