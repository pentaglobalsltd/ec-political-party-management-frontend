import * as yup from 'yup';

import { CHECK_ONLY_NUMBER } from '@constants/validation-string';
import { FORM_FIELDS } from '@constants/forms';
import { ID_TYPE } from '@containers/candidate-info-management/controller-list/apply-candidate-nomination-form/constants';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;

// 1
export const proposerBaseValidation = yup.object().shape({
  [PROPOSER.IS_AGREE]: yup
    .boolean()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_IS_AGREE'),
  [PROPOSER.NID_NUMBER]: yup
    .string()
    .nullable()
    .when([PROPOSER.ID_TYPE], (data, schema) => {
      if (data[0] === ID_TYPE.NID) {
        return schema
          .min(10, 'FIRST_PART_ERROR_MSG.PROPOSER_NID_NUMBER_MIN')
          .max(17, 'FIRST_PART_ERROR_MSG.PROPOSER_NID_NUMBER_MAX')
          .required('FIRST_PART_ERROR_MSG.PROPOSER_NID_NUMBER')
          .matches(
            CHECK_ONLY_NUMBER,
            'FIRST_PART_ERROR_MSG.PROPOSER_NID_NUMBER_FORMAT',
          );
      }
      return schema;
    }),
  [PROPOSER.VOTER_NUMBER]: yup
    .string()
    .nullable()
    .when([PROPOSER.ID_TYPE], (data, schema) => {
      if (data[0] === ID_TYPE.VOTER_NO) {
        return schema
          .min(10, 'FIRST_PART_ERROR_MSG.PROPOSER_VOTER_NUMBER_MIN')
          .max(17, 'FIRST_PART_ERROR_MSG.PROPOSER_VOTER_NUMBER_MAX')
          .required('FIRST_PART_ERROR_MSG.PROPOSER_VOTER_NUMBER')
          .matches(
            CHECK_ONLY_NUMBER,
            'FIRST_PART_ERROR_MSG.PROPOSER_VOTER_NUMBER_FORMAT',
          );
      }
      return schema;
    }),
  [PROPOSER.SERIAL_NUMBER]: yup.string().nullable(),
  [PROPOSER.BIRTH_DATE]: yup
    .string()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_BIRTH_DATE'),
  [PROPOSER.ZILLA_ID]: yup
    .number()
    .required('FIRST_PART_ERROR_MSG.PROPOSER_ZILLA_ID'),
});
