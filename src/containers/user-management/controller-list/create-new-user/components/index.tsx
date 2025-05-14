import { ReturningOfficer } from './user-specific-components/returning-officer';
import { AssistantReturningOfficer } from './user-specific-components/assistant-returning-officer';
import { DataEntryOperator } from './user-specific-components/operator';
import { PresidingOfficer } from './user-specific-components/PresidingOfficer';

import { USER_ROLE_TYPE } from '../../constants';
import { UserSpecificComponentProps } from './types';
import { UpazilaThanaElectionOfficer } from './user-specific-components/UpazilaThanaElectionOfficer';
import { ZillaElectionOfficer } from './user-specific-components/ZillaElectionOfficer';
import { RegionalElectionOfficer } from './user-specific-components/RegionalElectionOfficer';

const UserSpecificComponents = (props: UserSpecificComponentProps) => {
  const { userRoleWatch } = props;
  const {
    RETURNING_OFFICER,
    ASSISTANT_RETURNING_OFFICER,
    ASSISTANT_RETURNING_OFFICER_OPERATOR,
    DATA_ENTRY_OFFICER,
    PRESIDING_OFFICER,
    UPAZILA_THANA_ELECTION_OFFICER,
    ZILLA_ELECTION_OFFICER,
    REGIONAL_ELECTION_OFFICER,
  } = USER_ROLE_TYPE;

  const renderComponents = () => {
    switch (userRoleWatch) {
      case RETURNING_OFFICER:
        return <ReturningOfficer {...props} />;

      case ASSISTANT_RETURNING_OFFICER:
        return <AssistantReturningOfficer {...props} />;

      case ASSISTANT_RETURNING_OFFICER_OPERATOR:
        return <AssistantReturningOfficer {...props} />;

      case DATA_ENTRY_OFFICER:
        return <DataEntryOperator {...props} />;

      case PRESIDING_OFFICER:
        return <PresidingOfficer />;

      case UPAZILA_THANA_ELECTION_OFFICER:
        return <UpazilaThanaElectionOfficer />;

      case ZILLA_ELECTION_OFFICER:
        return <ZillaElectionOfficer />;
      case REGIONAL_ELECTION_OFFICER:
        return <RegionalElectionOfficer />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default UserSpecificComponents;
