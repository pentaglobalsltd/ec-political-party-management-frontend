import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;

export const unionParishadProposerValidation = yup.object().shape({
  [PROPOSER.UPAZILA_ID]: yup
    .string()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_UPAZILLA'),

  [PROPOSER.UNION_OR_WARD_ID]: yup
    .string()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_UNION_WARD'),

  [PROPOSER.UP_WARD_ID]: yup.string().nullable(),

  [PROPOSER.VOTER_AREA_ID]: yup
    .number()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_VOTER_AREA_ID'),
});
