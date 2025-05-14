import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

export const upazillaSupporterValidation = yup.object().shape({
  [SECOND_PART.CONSTITUENCY_ID]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_.CONSTITUENCY'),

  [SECOND_PART.UNION_OR_WARD_ID]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_UNION_WARD'),

  [SECOND_PART.VOTER_AREA_ID]: yup
    .number()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_VOTER_AREA_ID'),

  [SECOND_PART.UPAZILA_ID]: yup.number(),
});
