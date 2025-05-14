import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useCoreUnionOrWardsSearch } from './hooks/useCoreUnionOrWardsSearch';
import { useMasterUnionOrWardsSearch } from './hooks/useMasterUnionOrWardsSearch';
import { API_SERVICE } from '@components/application-search/constants';

interface Props {
  struct: any;
  pathWatchList?: any;
  queryWatchList?: any;
  resetData: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
}

export const UnionOrWardSearch = ({
  struct,
  pathWatchList,
  queryWatchList,
  resetData,
  emptyBelowData,
  callApi,
}: Props) => {
  const { getCoreUnionOrWardsData, coreUnionOrWards } =
    useCoreUnionOrWardsSearch();
  const { getMasterUnionOrWardsData, masterUnionOrWards } =
    useMasterUnionOrWardsSearch();

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
      ) &&
      callApi
    ) {
      if (struct?.apiService === API_SERVICE.MASTER) {
        getMasterUnionOrWardsData({
          params: pathWatchList,
          filter: queryWatchList,
        });
      } else {
        getCoreUnionOrWardsData({
          params: pathWatchList,
          filter: queryWatchList,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), JSON.stringify(queryWatchList), callApi]);

  const getOption = () => {
    if (struct?.apiService === API_SERVICE.MASTER) {
      return masterUnionOrWards;
    } else {
      return coreUnionOrWards;
    }
  };

  return (
    <div>
      <Select
        title="SEARCH.UNION_OR_WARD"
        name={APPLICATION_SEARCH.UNION_OR_WARD}
        options={getOption()}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.unionOrWard}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.unionOrWardOptions}
      />
    </div>
  );
};
