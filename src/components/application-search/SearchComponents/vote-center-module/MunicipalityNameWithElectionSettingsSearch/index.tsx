import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';

import Input from '@components/inputs/Input';

interface Props {
  resetData: any;
}

export const MunicipalityNameWithElectionSettingsSearch = ({
  resetData,
}: Props) => {
  return (
    <div>
      <Input
        title="SEARCH.MUNICIPALITY_CITY_CORPORATION"
        registerName={APPLICATION_SEARCH.MUNICIPALITY_BY_ELECTION_SETTINGS}
        readOnly={true}
        clearValue={resetData?.electionSettingsVoteCenter}
      />
    </div>
  );
};
