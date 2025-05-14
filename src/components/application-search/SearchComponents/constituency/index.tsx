import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useEffect, useState } from 'react';
import useElectionSchedulesCandidateTypeConstituencies from './hooks/useConstituencies';
import { SelectOptionArray } from '@type/selection-option-type';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

interface Props {
  setValue?: any;
  struct: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  watch?: any;
  callApi?: boolean;
  getElectionSettingsIdForAdmin?: boolean;
}

export const ConstituencySearch = ({
  struct,
  pathWatchList,
  resetData,
  emptyBelowData,
  callApi,
  watch,
  setValue,
  getElectionSettingsIdForAdmin = false,
}: Props) => {
  const { getConstituenciesData, constituencies } =
    useElectionSchedulesCandidateTypeConstituencies();
  const [electionSettingsFromRedux, setElectionSettingsFromRedux] = useState<
    SelectOptionArray[]
  >([]);
  const { isAdmin, constituencies: constituenciesFromRedux } =
    useFiltersRedux();

  const constituencyWatch = watch(APPLICATION_SEARCH.CONSTITUENCY);
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
    ) {
      getConstituenciesData({
        params: pathWatchList,
      });
    }
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
    if (getElectionSettingsIdForAdmin) {
      if (constituencyWatch) {
        const findElectionSettingsId = constituencies?.find(
          (item) => item.value === constituencyWatch,
        )?.extra?.electionSettingsId;

        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getElectionSettingsIdForAdmin, constituencyWatch]);

  useEffect(() => {
    if (!isAdmin) {
      if (constituencyWatch && callApi) {
        const findElectionSettingsId = electionSettingsFromRedux?.find(
          (item) => item.value === constituencyWatch,
        )?.extra?.electionSettingsId;
        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constituencyWatch, isAdmin, candidateTypeWatch, callApi]);

  useEffect(() => {
    if (!constituencyWatch) {
      setValue(APPLICATION_SEARCH.ELECTION_SETTINGS_ID, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constituencyWatch, candidateTypeWatch]);

  return (
    <div>
      <Select
        title="SEARCH.SEAT"
        name={APPLICATION_SEARCH.CONSTITUENCY}
        options={isAdmin ? constituencies : electionSettingsFromRedux}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.constituency}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.constituencyOptions}
      />
    </div>
  );
};
