import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useMasterUpazila from './hooks/useMasterUpazila';
import useCoreUpazila from './hooks/useCoreUpazila';
import { API_SERVICE } from '@components/application-search/constants';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { ELECTION_INFO } from '@constants/election-info';

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
}

export const ElectionSettingsUpazilaSearch = ({
  struct,
  pathWatchList,
  queryWatchList,
  emptyBelowData,
  resetData,
  callApi,
}: Props) => {
  const { upazilas: coreUpazilas, getUpazilasData: getCoreUpazilasData } =
    useCoreUpazila();
  const { upazilas: masterUpazilas, getUpazilasData: getMasterUpazilasData } =
    useMasterUpazila();

  const {
    isAdmin,
    electionTypes: electionTypesRedux,
    electionSettings: electionSettingsRedux,
  } = useFiltersRedux();

  const { watch, setValue } = useFormContext();

  const candidateTypeWatch = watch(APPLICATION_SEARCH.CANDIDATE_TYPE);
  const upazilaWatch = watch(APPLICATION_SEARCH.SUB_DISTRICT);

  useEffect(() => {
    if (
      struct?.apiService === API_SERVICE.MASTER &&
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
      getMasterUpazilasData({
        params: pathWatchList,
        filter: queryWatchList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), JSON.stringify(queryWatchList), callApi]);

  useEffect(() => {
    if (
      struct?.apiService === API_SERVICE.CORE &&
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
      getCoreUpazilasData({
        params: pathWatchList,
        filter: queryWatchList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), JSON.stringify(queryWatchList), callApi]);

  useEffect(() => {
    const isUpazillaElection =
      electionTypesRedux?.[0]?.value === ELECTION_INFO.UPAZILLA.ID;

    if (!isAdmin && upazilaWatch && isUpazillaElection) {
      setValue(APPLICATION_SEARCH.ELECTION_SETTINGS_ID, upazilaWatch);
    } else if (!upazilaWatch) {
      setValue(APPLICATION_SEARCH.ELECTION_SETTINGS_ID, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, upazilaWatch, electionTypesRedux?.[0]]);

  const getUpazilaOptions = () => {
    const electionTypeId = electionTypesRedux?.[0]?.value;

    if (struct?.apiService) {
      switch (struct?.apiService) {
        case API_SERVICE.MASTER:
          return masterUpazilas;

        case API_SERVICE.CORE:
          return coreUpazilas;

        default:
          return [];
      }
    }

    // upazilla election for RO-OP
    else if (electionTypeId === ELECTION_INFO.UPAZILLA.ID) {
      const upazillaArray = electionSettingsRedux?.filter(
        (item) => item?.extra?.candidateTypeId === candidateTypeWatch,
      );

      return upazillaArray || [];
    }

    return [];
  };

  return (
    <div>
      <Select
        title="SEARCH.SUB_DISTRICT"
        name={APPLICATION_SEARCH.SUB_DISTRICT}
        options={getUpazilaOptions()}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.electionSettingsUpazila}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.electionSettingsUpazilaOptions}
      />
    </div>
  );
};
