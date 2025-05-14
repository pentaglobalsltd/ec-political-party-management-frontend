import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

export const municipalitySupporterValidation = yup.object().shape({
  [SECOND_PART.MUNICIPALITY]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_RMO'),

  [SECOND_PART.UPAZILA_ID]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_UPAZILA_ID'),

  [SECOND_PART.UNION_OR_WARD_ID]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_UNION_OR_WARD_ID'),

  [SECOND_PART.VOTER_AREA_ID]: yup
    .number()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_VOTER_AREA_ID'),
});
