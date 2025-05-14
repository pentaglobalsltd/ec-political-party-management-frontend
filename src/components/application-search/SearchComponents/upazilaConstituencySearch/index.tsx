import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useEffect, useState } from 'react';
import useElectionSchedulesCandidateTypeConstituencies from './hooks/useCandidateTypeConstituencies';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { SelectOptionArray } from '@type/selection-option-type';

interface Props {
  struct: any;
  watch: any;
  setValue: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
  getElectionSettingsIdForAdmin?: boolean;
}

export const UpazilaConstituencySearch = ({
  struct,
  watch,
  setValue,
  pathWatchList,
  resetData,
  emptyBelowData,
  callApi,
  getElectionSettingsIdForAdmin,
}: Props) => {
  const {
    getElectionSchedulesCandidateTypeConstituenciesData,
    constituencies,
  } = useElectionSchedulesCandidateTypeConstituencies();

  const { isAdmin, constituencies: constituenciesFromRedux } =
    useFiltersRedux();

  const [electionSettingsFromRedux, setElectionSettingsFromRedux] = useState<
    SelectOptionArray[]
  >([]);

  const upazilaWatch = watch(APPLICATION_SEARCH.CONSTITUENCY);
  const candidateTypeWatch = watch(APPLICATION_SEARCH.CANDIDATE_TYPE);

  const isReduxArrayLengthOne = electionSettingsFromRedux?.length === 1;

  useEffect(() => {
    if (
      isAdmin &&
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      ) &&
      callApi
    ) {
      getElectionSchedulesCandidateTypeConstituenciesData(pathWatchList);
    }
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
      if (upazilaWatch && callApi) {
        const findElectionSettingsId = constituenciesFromRedux?.find(
          (item) =>
            item.value === upazilaWatch &&
            candidateTypeWatch === item?.extra?.candidateTypeId,
        )?.extra?.electionSettingsId;

        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upazilaWatch, isAdmin, candidateTypeWatch, callApi]);

  useEffect(() => {
    if (!upazilaWatch) {
      setValue(APPLICATION_SEARCH.ELECTION_SETTINGS_ID, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upazilaWatch, candidateTypeWatch]);

  useEffect(() => {
    if (getElectionSettingsIdForAdmin) {
      if (upazilaWatch) {
        const findElectionSettingsId = constituencies?.find(
          (item) => item.value === upazilaWatch,
        )?.extra?.electionSettingsId;
        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getElectionSettingsIdForAdmin, upazilaWatch]);

  useEffect(() => {
    if (!isAdmin && electionSettingsFromRedux?.length) {
      setValue(
        APPLICATION_SEARCH.CONSTITUENCY,
        electionSettingsFromRedux?.[0]?.value,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, electionSettingsFromRedux]);

  return (
    <div>
      <Select
        title="SEARCH.SUB_DISTRICT"
        name={APPLICATION_SEARCH.CONSTITUENCY}
        options={isAdmin ? constituencies : electionSettingsFromRedux}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.upazilaAsConstituency}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        disabled={!isAdmin && isReduxArrayLengthOne}
        clearOptions={resetData?.upazilaAsConstituencyOptions}
      />
    </div>
  );
};
