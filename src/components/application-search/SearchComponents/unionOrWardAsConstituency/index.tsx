import { useEffect, useState } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useConstituenciesByScheduleCandidateZillaMunicipalities } from './hooks/useConstituenciesByScheduleCandidateZillaMunicipalities';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { SelectOptionArray } from '@type/selection-option-type';

interface Props {
  struct: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
  watch: any;
  setValue: any;
  getElectionSettingsIdForAdmin?: boolean;
}

export const ConstituencyUnionOrWardSearch = ({
  struct,
  pathWatchList,
  resetData,
  emptyBelowData,
  callApi,
  watch,
  setValue,
  getElectionSettingsIdForAdmin,
}: Props) => {
  const {
    getConstituenciesByScheduleCandidateZillaMunicipalities,
    constituencies,
  } = useConstituenciesByScheduleCandidateZillaMunicipalities();
  const [electionSettingsFromRedux, setElectionSettingsFromRedux] = useState<
    SelectOptionArray[]
  >([]);

  const { isAdmin, constituencies: constituenciesFromRedux } =
    useFiltersRedux();
  const unionWardWatch = watch(APPLICATION_SEARCH.CONSTITUENCY);
  const candidateTypeWatch = watch(APPLICATION_SEARCH.CANDIDATE_TYPE);

  useEffect(() => {
    if (
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      ) &&
      callApi &&
      isAdmin
    )
      getConstituenciesByScheduleCandidateZillaMunicipalities(pathWatchList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), callApi]);

  useEffect(() => {
    if (!isAdmin && constituenciesFromRedux?.length && callApi) {
      let filteredData: any = constituenciesFromRedux?.filter(
        (item) => item?.extra?.candidateTypeId === candidateTypeWatch,
      );

      setElectionSettingsFromRedux(filteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, constituenciesFromRedux, candidateTypeWatch, callApi]);

  useEffect(() => {
    if (!isAdmin && callApi) {
      if (unionWardWatch) {
        const findElectionSettingsId = electionSettingsFromRedux?.find(
          (item) => item.value === unionWardWatch,
        )?.extra?.electionSettingsId;
        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionWardWatch, isAdmin, callApi, candidateTypeWatch]);

  useEffect(() => {
    if (getElectionSettingsIdForAdmin) {
      if (unionWardWatch) {
        const findElectionSettingsId = constituencies?.find(
          (item) => item.value === unionWardWatch,
        )?.extra?.electionSettingsId;
        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getElectionSettingsIdForAdmin, unionWardWatch]);

  useEffect(() => {
    if (!isAdmin && !unionWardWatch) {
      setValue(APPLICATION_SEARCH.ELECTION_SETTINGS_ID, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateTypeWatch, unionWardWatch]);
  return (
    <div>
      <Select
        title="SEARCH.UNION_OR_WARD"
        name={APPLICATION_SEARCH.CONSTITUENCY}
        options={isAdmin ? constituencies : electionSettingsFromRedux}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.unionOrWardAsConstituency}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.unionOrWardAsConstituencyOptions}
      />
    </div>
  );
};
