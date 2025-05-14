import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const REGIONAL_ELECTION_OFFICER =
  FORM_FIELDS.USER_MANAGEMENT.CREATE_SYSTEM_USER.REGIONAL_ELECTION_OFFICER;

export const regionalElectionOfficerValidation = yup.object().shape({
  [REGIONAL_ELECTION_OFFICER.REGION]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.REGIONAL_ELECTION_OFFICER_DEPARTMENT'),
});

export type RegionalElectionOfficerValidationDataType = yup.InferType<
  typeof regionalElectionOfficerValidation
>;
