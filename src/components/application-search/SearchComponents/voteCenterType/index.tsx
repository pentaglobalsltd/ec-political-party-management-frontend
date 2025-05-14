import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { StructTypes } from '../types';
import useVoterTypes from '@hooks/vote-center-management/main-list/voter-areas/useVoterTypes';

export const VoteCenterTypeSearch = ({
  struct,
  resetData,
  emptyBelowData,
}: {
  struct: StructTypes;
  resetData: any;
  emptyBelowData?: (data: any) => void;
}) => {
  const { voterTypesList, getVoterTypesList } = useVoterTypes();

  useEffect(() => {
    getVoterTypesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Select
        title="VOTE_CENTER_ADDITION.CENTER_TYPE"
        name={APPLICATION_SEARCH.CENTER_TYPE}
        options={voterTypesList}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.voteCenterType}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.voteCenterTypeOptions}
      />
    </div>
  );
};
