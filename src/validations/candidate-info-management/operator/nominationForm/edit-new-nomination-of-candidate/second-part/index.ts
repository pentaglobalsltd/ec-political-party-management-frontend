import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';
import { ID_TYPE } from '@containers/candidate-info-management/controller-list/apply-candidate-nomination-form/constants';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

export const supporterBaseValidation = yup.object().shape({
  [SECOND_PART.IS_AGREE]: yup.boolean(),
  [SECOND_PART.NID_NUMBER]: yup
    .string()
    .nullable()
    .when([SECOND_PART.ID_TYPE], (data, schema) => {
      if (data[0] === ID_TYPE.NID) {
        return schema
          .min(10, 'SECOND_PART_ERROR_MSG.SUPPORTER_NID_NUMBER_MIN')
          .max(17, 'SECOND_PART_ERROR_MSG.SUPPORTER_NID_NUMBER_MAX')
          .required('SECOND_PART_ERROR_MSG.SUPPORTER_NID_NUMBER')
          .matches(
            CHECK_ONLY_NUMBER,
            'SECOND_PART_ERROR_MSG.SUPPORTER_NID_NUMBER_FORMAT',
          );
      }
      return schema;
    }),
  [SECOND_PART.VOTER_NUMBER]: yup
    .string()
    .nullable()
    .when([SECOND_PART.ID_TYPE], (data, schema) => {
      if (data[0] === ID_TYPE.VOTER_NO) {
        return schema
          .min(10, 'SECOND_PART_ERROR_MSG.SUPPORTER_VOTER_NUMBER_MIN')
          .max(17, 'SECOND_PART_ERROR_MSG.SUPPORTER_VOTER_NUMBER_MAX')
          .required('SECOND_PART_ERROR_MSG.SUPPORTER_VOTER_NUMBER')
          .matches(
            CHECK_ONLY_NUMBER,
            'SECOND_PART_ERROR_MSG.SUPPORTER_VOTER_NUMBER_FORMAT',
          );
      }
      return schema;
    }),
  [SECOND_PART.SERIAL_NUMBER]: yup.string().nullable(),
  [SECOND_PART.BIRTH_DATE]: yup
    .string()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_BIRTH_DATE'),
  [SECOND_PART.ZILLA_ID]: yup
    .number()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_ZILLA_ID'),

  [SECOND_PART.UPAZILA_ID]: yup
    .number()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_UPAZILA_ID'),

  [SECOND_PART.MUNICIPALITY]: yup.number().nullable(),
  [SECOND_PART.UNION_OR_WARD_ID]: yup
    .number()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_UNION_OR_WARD_ID'),
  [SECOND_PART.VOTER_AREA_ID]: yup
    .number()
    .required('SECOND_PART_ERROR_MSG.SUPPORTER_VOTER_AREA_ID'),
});

export const secondPartValidationSchema = yup.object().shape({
  supporter: supporterBaseValidation,
});

export interface secondPartValidationSchemaType {
  supporter: yup.InferType<typeof supporterBaseValidation>;
}
