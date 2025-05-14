import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useVoterTypes from '@hooks/vote-center-management/main-list/voter-areas/useVoterTypes';

export const VoteCenterTypeSearch = () => {
  const { voterTypesList, getVoterTypesList } = useVoterTypes();

  useEffect(() => {
    getVoterTypesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Select
        placeholder="VOTE_CENTER_ADDITION.CENTER_TYPE"
        name={APPLICATION_SEARCH.CENTER_TYPE}
        options={voterTypesList}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
