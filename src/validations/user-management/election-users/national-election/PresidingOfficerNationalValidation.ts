import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { SelectMultiselectValidation } from '@validations/utils';

const PRESIDING_OFFICER =
  FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER.PRESIDING_OFFICER;

export const presidingOfficerNationalValidation = yup.object().shape({
  [PRESIDING_OFFICER.TYPE_OF_ELECTION]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.PRESIDING_OFFICER_TYPE_OF_ELECTION'),
  [PRESIDING_OFFICER.ELECTION_NAME]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.PRESIDING_OFFICER_ELECTION_NAME'),
  [PRESIDING_OFFICER.DISTRICT]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.PRESIDING_OFFICER_DISTRICT'),
  [PRESIDING_OFFICER.ELECTION_SETTINGS]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.PRESIDING_CONSTITUENCY',
  ),
  [PRESIDING_OFFICER.UPAZILA]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.PRESIDING_UPAZILA',
  ),
  [PRESIDING_OFFICER.UNION]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.PRESIDING_UNION',
  ),
  [PRESIDING_OFFICER.CENTER]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.PRESIDING_CENTER',
  ),
});

export type PresidingOfficerValidationDataType = yup.InferType<
  typeof presidingOfficerNationalValidation
>;
