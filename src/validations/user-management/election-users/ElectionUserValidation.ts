import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const DATA_ENTRY_OPERATOR =
  FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER.DATA_ENTRY_OPERATOR;

export const electionUserElectionTypeValidation = yup.object().shape({
  [DATA_ENTRY_OPERATOR.TYPE_OF_ELECTION]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.DATA_ENTRY_OP_TYPE_OF_ELECTION'),
  [DATA_ENTRY_OPERATOR.ELECTION_NAME]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.DATA_ENTRY_OP_ELECTION_NAME'),
});
