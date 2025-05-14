import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useMasterUpazila from './hooks/useMasterUpazila';
import useCoreUpazila from './hooks/useCoreUpazila';
import { API_SERVICE } from '@components/application-search/constants';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface Props {
  watch: any;
  struct?: any;
  queryWatchList?: {
    [key: string]: string | number;
  };
  pathWatchList?: {
    [key: string]: string | number;
  };
  resetData?: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
  setValue: UseFormSetValue<FieldValues>;
}

export const UpazilaSearch = ({
  struct,
  pathWatchList,
  queryWatchList,
  emptyBelowData,
  resetData,
  callApi,
  setValue,
}: Props) => {
  const { upazilas: coreUpazilas, getUpazilasData: getCoreUpazilasData } =
    useCoreUpazila();
  const { upazilas: masterUpazilas, getUpazilasData: getMasterUpazilasData } =
    useMasterUpazila();

  const { isAdmin, upazilas: upazilasFromRedux } = useFiltersRedux();
  const isAdminApiCall = isAdmin || struct?.electionUserDataUsingApi;

  useEffect(() => {
    if (
      isAdminApiCall &&
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
      if (struct?.apiService === API_SERVICE.CORE) {
        getCoreUpazilasData({
          params: pathWatchList,
          filter: queryWatchList,
        });
      } else
        getMasterUpazilasData({
          params: pathWatchList,
          filter: queryWatchList,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), JSON.stringify(queryWatchList), callApi]);

  useEffect(() => {
    if (
      (struct?.electionUserDataUsingApi || upazilasFromRedux?.length === 1) &&
      callApi
    ) {
      setValue(APPLICATION_SEARCH.SUB_DISTRICT, upazilasFromRedux?.[0]?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [struct?.electionUserDataUsingApi, upazilasFromRedux, callApi]);

  const getUpazilaOptions = () => {
    switch (struct?.apiService) {
      case API_SERVICE.MASTER:
        return masterUpazilas;

      case API_SERVICE.CORE:
        return coreUpazilas;

      default:
        return [];
    }
  };

  return (
    <div>
      <Select
        title="SEARCH.SUB_DISTRICT"
        name={APPLICATION_SEARCH.SUB_DISTRICT}
        options={
          (isAdminApiCall ? getUpazilaOptions() : upazilasFromRedux) || []
        }
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.upazila}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.upazilaOptions}
      />
    </div>
  );
};
