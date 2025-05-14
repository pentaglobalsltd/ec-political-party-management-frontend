import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';

import Input from '@components/inputs/Input';

interface Props {
  resetData: any;
}

export const ElectionConstituencyWithElectionSettingsSearch = ({
  resetData,
}: Props) => {
  return (
    <div>
      <Input
        title="SEARCH.ELECTION_CONSTITUENCY"
        registerName={
          APPLICATION_SEARCH.ELECTION_CONSTITUENCY_BY_ELECTION_SETTINGS
        }
        readOnly={true}
        clearValue={resetData?.electionSettingsVoteCenter}
      />
    </div>
  );
};
