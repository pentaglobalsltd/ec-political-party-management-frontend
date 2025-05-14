import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';

import Input from '@components/inputs/Input';

interface Props {
  resetData: any;
}

export const UpazilaNameWithElectionSettingsSearch = ({ resetData }: Props) => {
  return (
    <div>
      <Input
        title="SEARCH.SUB_DISTRICT"
        registerName={APPLICATION_SEARCH.UPAZILA_BY_ELECTION_SETTINGS}
        readOnly={true}
        clearValue={resetData?.electionSettingsVoteCenter}
      />
    </div>
  );
};
