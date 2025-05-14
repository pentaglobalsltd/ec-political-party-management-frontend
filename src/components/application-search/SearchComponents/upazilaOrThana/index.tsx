import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useEffect } from 'react';
import { useUpazilasOrThanas } from './hooks/useUpazilasOrThanas';

interface Props {
  struct: any;
  watchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  addFilter?: {
    [key: string]: string | number;
  };
  callApi?: boolean;
}

export const UpazilaOrThanaSearch = ({
  struct,
  watchList,
  resetData,
  emptyBelowData,
  callApi,
}: Props) => {
  const { upazilasOrThanas, getUpazilasOrThanas } = useUpazilasOrThanas();

  useEffect(() => {
    if (
      watchList &&
      Object.keys(watchList).reduce(
        (prev: any, curr: any) => prev && watchList[curr],
        true,
      ) &&
      callApi
    )
      getUpazilasOrThanas(watchList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchList), callApi]);

  return (
    <div>
      <Select
        title="SEARCH.UPAZILA_THANA"
        name={APPLICATION_SEARCH.UPAZILA_THANA}
        options={upazilasOrThanas}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.upazilaThana}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.upazilaThanaOptions}
      />
    </div>
  );
};
