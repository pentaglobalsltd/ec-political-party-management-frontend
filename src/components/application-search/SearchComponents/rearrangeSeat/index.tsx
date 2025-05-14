import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useElectionAreaReorganized } from '@hooks/election-schedule-management/election-process/election-area-reorganized/useElectionAreaReorganized';

export const ElectionAreaReorganizedSearch = () => {
  const { electionAreaReorganized, getElectionAreaReorganizedData } =
    useElectionAreaReorganized();

  useEffect(() => {
    getElectionAreaReorganizedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Select
        title="SEARCH.REARRANGE_SEAT"
        name={APPLICATION_SEARCH.REARRANGE_SEAT}
        options={electionAreaReorganized}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
