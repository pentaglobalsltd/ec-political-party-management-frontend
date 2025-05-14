import { useEffect, useState } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useElectionSchedulesCandidateTypeConstituencies from './hooks/useCandidateTypeConstituencies';
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
  setValue?: any;
  watch: any;
  getElectionSettingsIdForAdmin?: boolean;
}

export const MunicipalityAsConstituencySearch = ({
  struct,
  pathWatchList,
  emptyBelowData,
  resetData,
  callApi,
  setValue,
  watch,
  getElectionSettingsIdForAdmin,
}: Props) => {
  const {
    getElectionSchedulesCandidateTypeConstituenciesData,
    constituencies,
  } = useElectionSchedulesCandidateTypeConstituencies();
  const [electionSettingsFromRedux, setElectionSettingsFromRedux] = useState<
    SelectOptionArray[]
  >([]);
  const { isAdmin, constituencies: constituenciesFromRedux } =
    useFiltersRedux();

  const municipalityWatch = watch(APPLICATION_SEARCH.CONSTITUENCY);
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
      getElectionSchedulesCandidateTypeConstituenciesData(pathWatchList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), callApi]);

  useEffect(() => {
    if (!isAdmin && constituenciesFromRedux?.length && callApi) {
      const filteredData: any = constituenciesFromRedux?.filter(
        (item) => item?.extra?.candidateTypeId === candidateTypeWatch,
      );

      setElectionSettingsFromRedux(filteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, constituenciesFromRedux, candidateTypeWatch, callApi]);

  useEffect(() => {
    if (!isAdmin) {
      if (municipalityWatch && callApi) {
        const findElectionSettingsId = electionSettingsFromRedux?.find(
          (item) => item.value === municipalityWatch,
        )?.extra?.electionSettingsId;
        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalityWatch, isAdmin, candidateTypeWatch, callApi]);

  useEffect(() => {
    if (!municipalityWatch) {
      setValue(APPLICATION_SEARCH.ELECTION_SETTINGS_ID, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalityWatch, candidateTypeWatch]);

  useEffect(() => {
    if (getElectionSettingsIdForAdmin) {
      if (municipalityWatch) {
        const findElectionSettingsId = constituencies?.find(
          (item) => item.value === municipalityWatch,
        )?.extra?.electionSettingsId;

        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getElectionSettingsIdForAdmin, municipalityWatch]);

  return (
    <div>
      <Select
        title="SEARCH.MUNICIPALITY_CITY_CORPORATION"
        name={APPLICATION_SEARCH.CONSTITUENCY}
        options={isAdmin ? constituencies : electionSettingsFromRedux}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.municipalityAsConstituency}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.municipalityAsConstituencyOptions}
      />
    </div>
  );
};
