import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;

export const nationalProposerValidation = yup.object().shape({
  [PROPOSER.CONSTITUENCY_ID]: yup
    .number()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_CONSTITUENCY_ID'),
  [PROPOSER.UPAZILA_ID]: yup
    .number()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_UPAZILA_ID'),
  [PROPOSER.RMO_EN]: yup
    .string()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_RMO_EN'),
  [PROPOSER.MUNICIPALITY]: yup.number().nullable(),
  [PROPOSER.UNION_OR_WARD_ID]: yup
    .number()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_UNION_OR_WARD_ID'),
  [PROPOSER.VOTER_AREA_ID]: yup
    .number()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_VOTER_AREA_ID'),
});
