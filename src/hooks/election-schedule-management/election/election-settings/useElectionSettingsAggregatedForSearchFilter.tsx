import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetElectionSettingsAggregated } from '@api/election-schedule-management/election/election-settings/election-settings';
import { ElectionSettingsSearchProps } from '@type/election-declaration-management/election/election-settings/election-settings-types';

interface GetElectionSettings {
  searchItems: ElectionSettingsSearchProps;
  page?: number;
  size?: number;
}

interface HookReturnType {
  getElectionSettingsDataForSearchOptions: ({
    searchItems,
    page,
    size,
  }: GetElectionSettings) => void;
  electionSettingsListForSearchOptions: SearchOptionType[];
  resetElectionSettingsListForSearchOptions: () => void;
}

interface SearchOptionType {
  label: any;
  value: any;
}

const useGetElectionSettingsAggregatedForSearchFilter = (): HookReturnType => {
  const { language } = useLanguage();

  const [
    electionSettingsListForSearchOptions,
    setElectionSettingsListForSearchOptions,
  ] = useState<SearchOptionType[]>([]);

  const getElectionSettingsDataForSearchOptions = async ({
    searchItems,
    page = 0,
    size = 10,
  }: GetElectionSettings) => {
    try {
      const response = await apiGetElectionSettingsAggregated({
        searchItems,
        page,
        size,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.electionSettings?.map((item) => {
            const labelText =
              language === LANGUAGE.BANGLA
                ? `${item?.electionScheduleNameBn} -> ${item?.zillaNameBn} -> ${item?.constituencyNameBn}`
                : `${item?.electionScheduleNameEn} -> ${item?.zillaNameEn} -> ${item?.constituencyNameEn}`;

            return {
              label: labelText,
              value: item?.id,
              extra: {
                constituencyId: item?.constituencyId,
                settingsId: item?.id,
                zillaId: item?.zillaId,
              },
            };
          }) || [];

        setElectionSettingsListForSearchOptions(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetElectionSettingsListForSearchOptions = () =>
    setElectionSettingsListForSearchOptions([]);

  return {
    getElectionSettingsDataForSearchOptions,
    electionSettingsListForSearchOptions,
    resetElectionSettingsListForSearchOptions,
  };
};

export default useGetElectionSettingsAggregatedForSearchFilter;
