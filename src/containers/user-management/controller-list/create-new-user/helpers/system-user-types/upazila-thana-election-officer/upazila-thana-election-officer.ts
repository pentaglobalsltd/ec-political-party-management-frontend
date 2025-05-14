import { SubmitMapperType } from '../..';
import { createUpazilaThanaElectionOfficer } from './create-upazila-thana-election-officer';
import { EditUpazilaThanaElectionOfficer } from './update-upazila-thana-election-officer';

export const createOrEditUpazilaThanaElectionOfficer = (
  props: SubmitMapperType,
) => {
  const { userId } = props;

  if (!userId) {
    createUpazilaThanaElectionOfficer({ ...props });
  } else if (userId) {
    EditUpazilaThanaElectionOfficer({ ...props });
  }
};
