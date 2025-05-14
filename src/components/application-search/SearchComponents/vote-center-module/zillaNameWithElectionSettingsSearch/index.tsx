import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';

import Input from '@components/inputs/Input';
import { useTranslation } from 'react-i18next';

interface Props {
  resetData: any;
}

export const ZillaNameWithElectionSettingsSearch = ({ resetData }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <Input
        title={t('VOTE_CENTER_ADDITION.DISTRICT')}
        registerName={APPLICATION_SEARCH.DISTRICT_BY_ELECTION_SETTINGS}
        readOnly={true}
        clearValue={resetData?.electionSettingsVoteCenter}
      />
    </div>
  );
};
