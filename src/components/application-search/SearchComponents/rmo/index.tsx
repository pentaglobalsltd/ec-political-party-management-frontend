import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useEffect } from 'react';
import useRmos from './hooks/useRmo';

interface Props {
  struct: any;
  watchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  setValue?: any;
}

export const RmoSearch = ({
  struct,
  watchList,
  resetData,
  emptyBelowData,
}: Props) => {
  const { getRmoData, rmos } = useRmos();

  useEffect(() => {
    if (
      watchList &&
      Object.keys(watchList).reduce(
        (prev: any, curr: any) => prev && watchList[curr],
        true,
      )
    )
      getRmoData(watchList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchList)]);

  return (
    <div>
      <Select
        title="SEARCH.RMO"
        name={APPLICATION_SEARCH.RMO}
        options={rmos}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.rmo}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.rmoOptions}
      />
    </div>
  );
};
