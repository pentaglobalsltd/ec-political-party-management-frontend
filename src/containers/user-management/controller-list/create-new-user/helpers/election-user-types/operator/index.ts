import { createOperator } from './create-operator';
import { editOperator } from './edit-operator';
import { SubmitMapperType } from '../..';

export const createOrEditOperatorUser = (props: SubmitMapperType) => {
  const { userId } = props;

  if (!userId) {
    // create operator
    createOperator({ ...props });
  } else if (userId) {
    // edit operator
    editOperator({ ...props });
  }
};
