import { createReturningOfficer } from './create-returning-officer';
import { editReturningOfficer } from './edit-returning-officer';
import { SubmitMapperType } from '../..';

export const createOrEditReturningOfficer = (props: SubmitMapperType) => {
  const { userId } = props;

  if (!userId) {
    // create ReturningOfficer
    createReturningOfficer({ ...props });
  } else if (userId) {
    // edit ReturningOfficer
    editReturningOfficer({ ...props });
  }
};
