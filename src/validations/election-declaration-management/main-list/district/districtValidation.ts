import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const DISTRICT =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.DISTRICT.CREATE_DISTRICT;

export const districtValidation = yup.object().shape({
  [DISTRICT.DIVISION]: yup
    .string()
    .required('DISTRICT_VALIDATION_ERROR_MSG.DIVISION'),
  [DISTRICT.DISTRICT_BN]: yup
    .string()
    .required('DISTRICT_VALIDATION_ERROR_MSG.DISTRICT_BN'),
  [DISTRICT.DISTRICT_EN]: yup
    .string()
    .required('DISTRICT_VALIDATION_ERROR_MSG.DISTRICT_EN'),
  [DISTRICT.DISTRICT_GO_CODE]: yup
    .string()
    .required('DISTRICT_VALIDATION_ERROR_MSG.DISTRICT_GO_CODE')
    .matches(
      CHECK_ONLY_NUMBER,
      'DISTRICT_VALIDATION_ERROR_MSG.DISTRICT_GEO_CODE_POSITIVE',
    ),
  [DISTRICT.SERIAL_NO]: yup
    .string()
    .required('DISTRICT_VALIDATION_ERROR_MSG.SERIAL_NO')
    .matches(
      CHECK_ONLY_NUMBER,
      'DISTRICT_VALIDATION_ERROR_MSG.SERIAL_NO_POSITIVE',
    ),
});

export type DistrictDataType = yup.InferType<typeof districtValidation>;
