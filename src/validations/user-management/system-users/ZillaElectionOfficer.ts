import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const ZILLA_ELECTION_OFFICER =
  FORM_FIELDS.USER_MANAGEMENT.CREATE_SYSTEM_USER.ZILLA_ELECTION_OFFICER;

export const zillaElectionOfficerValidation = yup.object().shape({
  [ZILLA_ELECTION_OFFICER.REGION]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.DISTRICT_ELECTION_OFFICER_DEPARTMENT'),
  [ZILLA_ELECTION_OFFICER.ZILLA]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.DISTRICT_ELECTION_OFFICER_DISTRICT'),
});

export type ZillaElectionOfficerValidationDataType = yup.InferType<
  typeof zillaElectionOfficerValidation
>;
