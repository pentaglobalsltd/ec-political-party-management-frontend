import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const CREATE_SUB_DISTRICT =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.SUB_DISTRICT
    .CREATE_SUB_DISTRICT;

export const createSubDistrictValidation = yup.object().shape({
  [CREATE_SUB_DISTRICT.DISTRICT]: yup
    .string()
    .required('SUB_DISTRICT_ERROR_MSG.DISTRICT'),
  [CREATE_SUB_DISTRICT.SUB_DISTRICT_BN]: yup
    .string()
    .required('SUB_DISTRICT_ERROR_MSG.SUB_DISTRICT_BN'),
  [CREATE_SUB_DISTRICT.SUB_DISTRICT_EN]: yup
    .string()
    .required('SUB_DISTRICT_ERROR_MSG.SUB_DISTRICT_EN'),
  [CREATE_SUB_DISTRICT.GO_CODE]: yup
    .string()
    .required('SUB_DISTRICT_ERROR_MSG.GO_CODE')
    .matches(
      CHECK_ONLY_NUMBER,
      'SUB_DISTRICT_ERROR_MSG.SUB_DISTRICT_GEO_CODE_POSITIVE',
    ),

  [CREATE_SUB_DISTRICT.IS_THANA]: yup.string(),
});

export type CreateSubDistrictDataType = yup.InferType<
  typeof createSubDistrictValidation
>;
