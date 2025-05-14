import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useEffect } from 'react';
import useElectionSchedules from './hooks/useSchedule';
import { StructTypes } from '../types';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

interface Props {
  struct?: StructTypes;
  watchList?: {
    [key: string]: string | number;
  };
  resetData?: any;
  emptyBelowData?: (data: any) => void;
  isActiveElectionSchedule?: boolean;
  setValue: any;
  watch?: any;
  getScheduleDate?: boolean;
}
export const ElectionScheduleSearch = ({
  struct,
  watchList,
  resetData,
  emptyBelowData,
  isActiveElectionSchedule,
  setValue,
  watch,
  getScheduleDate,
}: Props) => {
  const { electionSchedules, getElectionSchedulesData } = useElectionSchedules(
    isActiveElectionSchedule ? true : false,
  );

  const { isAdmin, electionSchedules: electionSchedulesRedux } =
    useFiltersRedux();

  const isReduxArrayLengthOne = electionSchedulesRedux?.length === 1;

  useEffect(() => {
    if (
      watchList &&
      Object.keys(watchList).reduce(
        (prev: any, curr: any) => prev && watchList[curr],
        true,
      ) &&
      isAdmin
    )
      getElectionSchedulesData(watchList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchList)]);

  useEffect(() => {
    if (!isAdmin && electionSchedulesRedux?.length) {
      setValue(
        APPLICATION_SEARCH.ELECTION_SCHEDULE,
        electionSchedulesRedux?.[0]?.value,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, electionSchedulesRedux]);

  const scheduleWatchValue = watch(APPLICATION_SEARCH.ELECTION_SCHEDULE);

  useEffect(() => {
    if (scheduleWatchValue && getScheduleDate) {
      const dateOfElection = electionSchedules?.find(
        (item) => item?.value === scheduleWatchValue,
      )?.extra;
      setValue(
        APPLICATION_SEARCH.DATE_OF_ELECTION,
        dateOfElection?.dateOfElection,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleWatchValue]);

  return (
    <div>
      <Select
        title="SEARCH.ELECTION_NAME"
        name={APPLICATION_SEARCH.ELECTION_SCHEDULE}
        options={(isAdmin ? electionSchedules : electionSchedulesRedux) || []}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.electionSchedule}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        disabled={!isAdmin && isReduxArrayLengthOne}
        clearOptions={resetData?.electionScheduleOptions}
      />
    </div>
  );
};
