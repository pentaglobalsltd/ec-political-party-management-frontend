import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { SelectMultiselectValidation } from '@validations/utils';

const RETURNING_OFFICER =
  FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER.RETURNING_OFFICER;

export const returningOfficerNationalValidation = yup.object().shape({
  [RETURNING_OFFICER.TYPE_OF_ELECTION]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.RETURNING_OFFICER_TYPE_OF_ELECTION'),
  [RETURNING_OFFICER.ELECTION_NAME]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.RETURNING_OFFICER_ELECTION_NAME'),
  [RETURNING_OFFICER.DISTRICT]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.RETURNING_OFFICER_DISTRICT'),
  [RETURNING_OFFICER.ELECTION_SETTINGS]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.RETURNING_OFFICER_CONSTITUENCY',
  ),
});

export type ReturningOfficerValidationDataType = yup.InferType<
  typeof returningOfficerNationalValidation
>;
