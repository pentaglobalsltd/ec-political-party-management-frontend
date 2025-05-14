import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { usePollingCenter } from './hooks/usePollingCenterSelect';

interface Props {
  struct: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  queryWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
}

export const PollingCenterSearch = ({
  struct,
  queryWatchList,
  resetData,
  pathWatchList,
  emptyBelowData,
}: Props) => {
  const { pollingCenter, getPollingCenterData } = usePollingCenter();

  useEffect(() => {
    if (
      queryWatchList &&
      Object.keys(queryWatchList).reduce(
        (prev: any, curr: any) => prev && queryWatchList[curr],
        true,
      ) &&
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      )
    )
      getPollingCenterData({ params: pathWatchList, filter: queryWatchList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryWatchList), JSON.stringify(pathWatchList)]);

  return (
    <div>
      <Select
        title="CENTER_OFFICER_MANAGEMENT_SEARCH.POLLING_CENTER"
        name={APPLICATION_SEARCH.POLLING_CENTER}
        options={pollingCenter}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.pollingCenter}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.pollingCenterOptions}
      />
    </div>
  );
};
