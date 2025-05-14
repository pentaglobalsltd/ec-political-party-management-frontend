import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const CANDIDATE_ELECTION_DETAILS =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .CANDIDATE_ELECTION_DETAILS;

export const candidateDetailsNationalValidation = yup.object().shape({
  [CANDIDATE_ELECTION_DETAILS.ZILLA_ID]: yup
    .number()
    .required('FIRST_PART_ERROR_MSG.CANDIDATE_ZILLA_ID'),
  // [CANDIDATE_ELECTION_DETAILS.CONSTITUENCY_ID]: yup
  //   .number()
  //   .required('FIRST_PART_ERROR_MSG.CANDIDATE_CONSTITUENCY_ID'),
});
