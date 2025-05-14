import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const DIVISION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.DIVISION.CREATE_DIVISION;

export const divisionValidation = yup.object().shape({
  [DIVISION.NAME_BN]: yup
    .string()
    .required('DIVISION_VALIDATION_ERROR_MSG.NAME_BN'),
  [DIVISION.NAME_EN]: yup
    .string()
    .required('DIVISION_VALIDATION_ERROR_MSG.NAME_EN'),
  [DIVISION.DIVISION_GO_CODE]: yup
    .string()
    .required('DIVISION_VALIDATION_ERROR_MSG.DIVISION_GO_CODE')
    .matches(
      CHECK_ONLY_NUMBER,
      'DIVISION_VALIDATION_ERROR_MSG.DIVISION_GEO_CODE_POSITIVE',
    ),
});

export type DivisionDataType = yup.InferType<typeof divisionValidation>;
