import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import Select from '@components/inputs/Select';
import useElectionTypesMaster from '@hooks/miscellaneous/election-type/useElectionTypesMaster';
import { IconChevronDown } from '@pentabd/icons';
import { useEffect } from 'react';
import { RefreshDataType, StructTypes } from '../types';

export const ElectionTypeSearch = ({
  struct,
  resetData,
  emptyBelowData,
}: {
  struct?: StructTypes;
  resetData?: RefreshDataType;
  emptyBelowData?: (data: any) => void;
}) => {
  const { electionTypesMaster, getElectionTypesMasterData } =
    useElectionTypesMaster();

  //get election Type
  useEffect(() => {
    getElectionTypesMasterData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Select
        title="SEARCH.ELECTION_TYPE"
        name={APPLICATION_SEARCH.ELECTION_TYPE}
        options={electionTypesMaster}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.electionType}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.electionTypeOptions}
      />
    </div>
  );
};
