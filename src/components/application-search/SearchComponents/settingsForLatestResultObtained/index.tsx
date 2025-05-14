import { useEffect } from 'react';

import { IconChevronDown } from '@pentabd/icons';

import Select from '@components/inputs/Select';

import { APPLICATION_SEARCH } from '..';
import useGetElectionSettings from '@hooks/miscellaneous/core-hook/election-settings/useElectionSettings';

interface Props {
  queryWatchList?: {
    [key: string]: string | number;
  };
  emptyBelowData?: (data: any) => void;
  resetData: any;
  struct: any;
  watch: any;
}

export const SettingsForLatestResultObtained = ({
  emptyBelowData,
  queryWatchList,
  resetData,
  struct,
}: Props) => {
  const { electionSettingsList, getElectionSettingsData } =
    useGetElectionSettings();

  useEffect(() => {
    if (
      queryWatchList &&
      Object.keys(queryWatchList).reduce(
        (prev: any, curr: any) => prev && queryWatchList[curr],
        true,
      )
    ) {
      getElectionSettingsData({
        searchItems: queryWatchList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryWatchList)]);

  return (
    <div>
      <Select
        title="SEARCH.SETTINGS"
        name={APPLICATION_SEARCH.CONSTITUENCY}
        options={electionSettingsList}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        disabled={Object.keys(electionSettingsList)?.length === 0}
        clearValue={resetData?.constituency}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.constituencyOptions}
        isMulti
      />
    </div>
  );
};
