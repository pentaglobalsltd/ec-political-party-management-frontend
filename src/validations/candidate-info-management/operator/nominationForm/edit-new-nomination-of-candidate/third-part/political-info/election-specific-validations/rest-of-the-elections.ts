import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const CANDIDATE_POLITICAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_POLITICAL_INFO;

export const politicalPartyInfoDynamicValidation = yup.object().shape({
  [CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX]: yup.boolean(),
  [CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_ID]: yup
    .string()
    .nullable()
    .when([CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX], {
      is: false,
      then: (schema) =>
        schema
          .required('THIRD_PART_ERROR_MSG.CANDIDATE_POLITICAL_PARTY_ID')
          .matches(
            CHECK_ONLY_NUMBER,
            'THIRD_PART_ERROR_MSG.CANDIDATE_POLITICAL_PARTY_ID',
          ),
      otherwise: (schema) => schema,
    }),
  [CANDIDATE_POLITICAL_INFO.PREFERRED_SYMBOL_ID]: yup
    .string()
    .nullable()
    .when([CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX], {
      is: true,
      then: (schema) =>
        schema
          .required('THIRD_PART_ERROR_MSG.CANDIDATE_PREFERRED_SYMBOL_ID')
          .matches(
            CHECK_ONLY_NUMBER,
            'THIRD_PART_ERROR_MSG.CANDIDATE_PREFERRED_SYMBOL_ID',
          ),
      otherwise: (schema) => schema,
    }),
});
