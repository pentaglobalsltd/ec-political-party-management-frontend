import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useEffect } from 'react';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import useCoreElectionSchedulesZillas from './hooks/useCoreZillas';
import useMasterElectionSchedulesZillas from './hooks/useMasterZillas';
import { API_SERVICE } from '@components/application-search/constants';

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
  setValue?: any;
  callApi?: boolean;
}

export const DistrictSearch = ({
  struct,
  pathWatchList,
  queryWatchList,
  resetData,
  emptyBelowData,
  setValue,
  callApi,
}: Props) => {
  const { getCoreDistrictData, coreZillas } = useCoreElectionSchedulesZillas();
  const { getMasterDistrictData, masterZillas } =
    useMasterElectionSchedulesZillas();

  const { isAdmin, zillas: zillasFromRedux } = useFiltersRedux();

  const isReduxArrayLengthOne = zillasFromRedux?.length === 1;
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
    )
      if (struct?.apiService === API_SERVICE.MASTER) {
        getMasterDistrictData({
          params: pathWatchList,
          filter: queryWatchList,
        });
      } else {
        getCoreDistrictData({
          params: pathWatchList,
          filter: queryWatchList,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), JSON.stringify(queryWatchList), callApi]);

  useEffect(() => {
    if (!isAdmin && zillasFromRedux?.length) {
      setValue(APPLICATION_SEARCH.DISTRICT, zillasFromRedux?.[0]?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, zillasFromRedux]);

  const getOption = () => {
    if (isAdminApiCall) {
      if (struct?.apiService === API_SERVICE.MASTER) {
        return masterZillas;
      } else {
        return coreZillas;
      }
    } else {
      return zillasFromRedux;
    }
  };

  return (
    <div>
      <Select
        title="SEARCH.DISTRICT"
        name={APPLICATION_SEARCH.DISTRICT}
        options={getOption() || []}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        disabled={!isAdminApiCall && isReduxArrayLengthOne}
        clearValue={resetData?.district}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.districtOptions}
      />
    </div>
  );
};
