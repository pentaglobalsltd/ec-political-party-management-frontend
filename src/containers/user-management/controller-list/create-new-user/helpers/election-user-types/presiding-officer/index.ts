import { createPresidingOfficer } from './create-presiding-office';
import { editPresidingOfficer } from './edit-presiding-officer';
import { SubmitMapperType } from '../..';

export const createOrEditPresidingOfficer = (props: SubmitMapperType) => {
  const { userId } = props;

  if (!userId) {
    // create PresidingOfficer
    createPresidingOfficer({ ...props });
  } else if (userId) {
    // edit PresidingOfficer
    editPresidingOfficer({ ...props });
  }
};
