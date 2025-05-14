import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useElectionSettingsUnionsOrWards } from './hooks/useElectionSettingsUnionOrWards';
import { useReservedWards } from './hooks/useReservedWard';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { ELECTION_INFO } from '@constants/election-info';
import { useCoreElectionSettingsUnionsOrWards } from './hooks/useCoreUnionOrWards';
import { API_SERVICE } from '@components/application-search/constants';
import { StructTypes } from '../../types';

interface Props {
  watch?: any;
  struct?: StructTypes;
  filterList?: {
    [key: string]: string | number;
  };
  watchList?: {
    [key: string]: string | number;
  };
  resetData?: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
  areQueriesOptional?: boolean;
}

export const ElectionSettingsUnionOrWardsSearch = ({
  watch,
  struct,
  watchList,
  filterList,
  emptyBelowData,
  resetData,
  callApi,
  areQueriesOptional,
}: Props) => {
  const { reserveWards, getReservedWardsData } = useReservedWards();
  const {
    unionsOrWards: masterUnionOrWards,
    getUnionsOrWardsData: getMasterUnionsOrWardsData,
  } = useElectionSettingsUnionsOrWards();
  const {
    unionsOrWards: coreUnionsOrWards,
    getUnionsOrWardsData: getCoreUnionsOrWardsData,
  } = useCoreElectionSettingsUnionsOrWards();
  const candidateTypeWatch = watch(APPLICATION_SEARCH.CANDIDATE_TYPE);
  const electionTypeWatch = watch(APPLICATION_SEARCH.ELECTION_TYPE);

  const { isAdmin } = useFiltersRedux();

  const isCityCorporationMunicipalityElectionUser =
    !isAdmin &&
    (electionTypeWatch === ELECTION_INFO.CITY_CORPORATION.ID ||
      electionTypeWatch === ELECTION_INFO.MUNICIPALITY.ID);

  useEffect(() => {
    if (
      struct?.apiService === API_SERVICE.MASTER &&
      filterList &&
      Object.keys(filterList).reduce(
        (prev: any, curr: any) => prev && filterList[curr],
        true,
      ) &&
      (candidateTypeWatch ===
        CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID ||
        CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID) &&
      callApi
    ) {
      getReservedWardsData({ filter: filterList });
    }

    if (
      struct?.apiService === API_SERVICE.MASTER &&
      ((filterList &&
        Object.keys(filterList).reduce(
          (prev: any, curr: any) => prev && filterList[curr],
          true,
        )) ||
        (struct?.optionalQueryParams && areQueriesOptional)) &&
      callApi
    ) {
      getMasterUnionsOrWardsData({
        params: watchList ? watchList : {},
        filter: filterList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filterList), callApi]);

  useEffect(() => {
    if (
      struct?.apiService === API_SERVICE.CORE &&
      filterList &&
      Object.keys(filterList).reduce(
        (prev: any, curr: any) => prev && filterList[curr],
        true,
      ) &&
      watchList &&
      Object.keys(watchList).reduce(
        (prev: any, curr: any) => prev && watchList[curr],
        true,
      ) &&
      callApi
    ) {
      getCoreUnionsOrWardsData({
        params: watchList,
        filter: filterList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchList), JSON.stringify(filterList), callApi]);

  const getUnionWardsDropDown = () => {
    /** if user is city corporation OP, read from redux */
    if (isCityCorporationMunicipalityElectionUser) return coreUnionsOrWards;

    /** else follow the way admin does */
    return candidateTypeWatch ===
      CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID ||
      candidateTypeWatch === CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID
      ? reserveWards
      : masterUnionOrWards;
  };

  return (
    <div>
      <Select
        title="SEARCH.UNION_OR_WARD"
        name={APPLICATION_SEARCH.UNION_OR_WARD}
        options={getUnionWardsDropDown()}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.electionSettingsUnionOrWard}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.electionSettingsUnionOrWardOptions}
      />
    </div>
  );
};
