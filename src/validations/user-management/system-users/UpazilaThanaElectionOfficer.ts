import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { SelectMultiselectValidation } from '@validations/utils';

const UPAZILA_THANA_ELECTION_OFFICER =
  FORM_FIELDS.USER_MANAGEMENT.CREATE_SYSTEM_USER.UPAZILA_THANA_ELECTION_OFFICER;

export const upazilaThanaElectionOfficerValidation = yup.object().shape({
  [UPAZILA_THANA_ELECTION_OFFICER.REGION]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.UPAZILLA_THANA_EO_DEPARTMENT'),
  [UPAZILA_THANA_ELECTION_OFFICER.ZILLA]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.UPAZILLA_THANA_EO_DISTRICT'),
  [UPAZILA_THANA_ELECTION_OFFICER.UPAZILA]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.UPAZILLA_THANA_EO_UPAZILA',
  ),
});

export type UpazilaThanaElectionOfficerValidationDataType = yup.InferType<
  typeof upazilaThanaElectionOfficerValidation
>;
