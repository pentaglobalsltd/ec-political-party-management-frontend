import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { SelectMultiselectValidation } from '@validations/utils';

const ASSISTANT_RETURNING_OFFICER =
  FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER.ASSISTANT_RETURNING_OFFICER;

export const assistantReturningOfficerUpazilaValidation = yup.object().shape({
  [ASSISTANT_RETURNING_OFFICER.TYPE_OF_ELECTION]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.ARO_TYPE_OF_ELECTION'),
  [ASSISTANT_RETURNING_OFFICER.ELECTION_NAME]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.ARO_ELECTION_NAME'),
  [ASSISTANT_RETURNING_OFFICER.DISTRICT]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.ARO_DISTRICT'),
  [ASSISTANT_RETURNING_OFFICER.UPAZILA]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.ARO_UPAZILA',
  ),
  [ASSISTANT_RETURNING_OFFICER.UNION]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.ARO_UNION',
  ),
  [ASSISTANT_RETURNING_OFFICER.CENTER]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.ARO_CENTER',
  ),
});

export type AssistantReturningOfficerUpazilaValidationDataType = yup.InferType<
  typeof assistantReturningOfficerUpazilaValidation
>;
