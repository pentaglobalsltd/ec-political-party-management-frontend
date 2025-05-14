import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

export const nationalSupporterValidation = yup.object().shape({
  [SECOND_PART.CONSTITUENCY_ID]: yup
    .number()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_CONSTITUENCY_ID'),
  [SECOND_PART.RMO_EN]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_RMO_EN'),
});
