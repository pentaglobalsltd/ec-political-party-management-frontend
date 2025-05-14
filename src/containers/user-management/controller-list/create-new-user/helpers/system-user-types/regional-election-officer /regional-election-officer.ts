import { SubmitMapperType } from '../..';
import { createRegionalElectionOfficer } from './create-regional-election-officer';
import { EditRegionalElectionOfficer } from './update-regional-election-officer';

export const createOrEditRegionalElectionOfficer = (
  props: SubmitMapperType,
) => {
  const { userId } = props;

  if (!userId) {
    createRegionalElectionOfficer({ ...props });
  } else if (userId) {
    EditRegionalElectionOfficer({ ...props });
  }
};
