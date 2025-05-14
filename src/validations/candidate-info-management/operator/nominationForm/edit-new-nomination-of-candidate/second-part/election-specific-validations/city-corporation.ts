import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

export const cityCorporationSupporterValidation = yup.object().shape({
  [SECOND_PART.MUNICIPALITY]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_MUNICIPALITY'),

  [SECOND_PART.UPAZILA_ID]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_UPAZILLA'),

  [SECOND_PART.UNION_OR_WARD_ID]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_UNION_WARD'),

  [SECOND_PART.VOTER_AREA_ID]: yup
    .number()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_VOTER_AREA_ID'),
});
