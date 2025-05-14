import { SubmitMapperType } from '../..';
import { createAdmin } from './create-admin';
import { editAdmin } from './update-admin';

export const createOrEditAdmin = (props: SubmitMapperType) => {
  const { userId } = props;

  if (!userId) {
    createAdmin({ ...props });
  } else if (userId) {
    editAdmin({ ...props });
  }
};
