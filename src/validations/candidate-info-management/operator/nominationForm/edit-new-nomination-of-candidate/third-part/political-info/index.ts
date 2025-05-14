import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const CANDIDATE_POLITICAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_POLITICAL_INFO;

export const politicalInfoBaseValidation = yup.object().shape({
  [CANDIDATE_POLITICAL_INFO.PREFERRED_SYMBOL_ID]: yup.string().nullable(),
});
