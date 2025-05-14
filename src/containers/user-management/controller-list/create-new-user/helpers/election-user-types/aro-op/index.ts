import { createAroOp } from './create-aro-op';
import { editAroOp } from './edit-aro-op';
import { SubmitMapperType } from '../..';

export const createOrEditAroOp = (props: SubmitMapperType) => {
  const { userId } = props;

  if (!userId) {
    // create AroOp
    createAroOp({ ...props });
  } else if (userId) {
    // edit AroOp
    editAroOp({ ...props });
  }
};
