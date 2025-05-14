import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useInstituteList } from './hooks/useInstituteListSelect';
import { StructTypes } from '../types';

interface Props {
  queryWatchList?: {
    [key: string]: string | number;
  };
  pathWatchList?: {
    [key: string]: string | number;
  };
  callApi?: boolean;
  struct?: StructTypes;
  resetData: any;
  emptyBelowData?: (data: any) => void;
}

export const InstituteNameSearch = ({
  queryWatchList,
  pathWatchList,
  callApi,
  struct,
  emptyBelowData,
  resetData,
}: Props) => {
  const { institutes, getInstituteList } = useInstituteList();

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
      getInstituteList({
        params: pathWatchList,
        filter: { ...queryWatchList, isActive: 'true' },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), JSON.stringify(queryWatchList), callApi]);

  return (
    <div>
      <Select
        title="SEARCH.INSTITUTE_NAME"
        name={APPLICATION_SEARCH.INSTITUTE_NAME}
        options={institutes}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.institute}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.instituteOptions}
      />
    </div>
  );
};
