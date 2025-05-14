import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useElectionTypesCore from '@hooks/miscellaneous/core-hook/election-type/useElectionTypesCore';
import useElectionTypesMaster from '@hooks/miscellaneous/master-hook/election-type/useElectionTypesMaster';
import { RefreshDataType, StructTypes } from '../types';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

export const ElectionTypeSearch = ({
  struct,
  resetData,
  emptyBelowData,
  setValue,
}: {
  struct?: StructTypes;
  resetData?: RefreshDataType;
  emptyBelowData?: (data: any) => void;
  setValue: any;
}) => {
  const { getElectionTypesCoreData, electionTypesCore } =
    useElectionTypesCore();
  const { electionTypesMaster, getElectionTypesMasterData } =
    useElectionTypesMaster();

  const { isAdmin, electionTypes: electionTypesRedux } = useFiltersRedux();
  const isArrayLengthOne = electionTypesRedux?.length === 1;

  //get election Type
  useEffect(() => {
    // IF admin
    if (struct?.apiService === 'core') getElectionTypesCoreData();
    else if (struct?.apiService === 'master') getElectionTypesMasterData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAdmin && electionTypesRedux?.length) {
      setValue(
        APPLICATION_SEARCH.ELECTION_TYPE,
        electionTypesRedux?.[0]?.value,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, electionTypesRedux]);

  const getOptions = () => {
    if (isAdmin) {
      // if ADMIN

      switch (struct?.apiService) {
        case 'core':
          return electionTypesCore;

        case 'master':
          return electionTypesMaster;

        default:
          return [];
      }
    }

    // Redux
    else {
      return electionTypesRedux;
    }
  };
  return (
    <div>
      <Select
        title="SEARCH.ELECTION_TYPE"
        name={APPLICATION_SEARCH.ELECTION_TYPE}
        options={getOptions() || []}
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
        // defaultValue={isArrayLengthOne ? electionTypesRedux?.[0]?.value : ''}
        disabled={!isAdmin && isArrayLengthOne}
        clearOptions={resetData?.electionTypeOptions}
      />
    </div>
  );
};
