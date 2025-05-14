import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useRegions from './hooks/useRegion';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

interface Props {
  struct: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  setValue?: any;
}

export const DivisionSearch = ({
  struct,
  pathWatchList,
  resetData,
  emptyBelowData,
  setValue,
}: Props) => {
  const { getRegionData, regions } = useRegions();
  const { isAdmin, regions: regionsFromRedux } = useFiltersRedux();

  useEffect(() => {
    if (
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      )
    )
      getRegionData(pathWatchList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList)]);

  useEffect(() => {
    if (!isAdmin && regionsFromRedux?.length) {
      setValue(APPLICATION_SEARCH.DIVISION, regionsFromRedux?.[0]?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, regionsFromRedux]);

  return (
    <div>
      <Select
        title="SEARCH.DIVISION"
        name={APPLICATION_SEARCH.DIVISION}
        options={regions}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.region}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.regionOptions}
      />
    </div>
  );
};
