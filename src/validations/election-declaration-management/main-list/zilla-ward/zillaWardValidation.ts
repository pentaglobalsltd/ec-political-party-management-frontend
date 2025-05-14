import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';

const CREATE_ZILLA_WARD =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.ZILLA_WARD
    .CREATE_ZILLA_WARD;

export const createZillaWardValidation = yup.object().shape({
  [CREATE_ZILLA_WARD.DISTRICT]: yup
    .string()
    .required('ZILLA_WARD_VALIDATION_ERROR_MSG.DISTRICT'),
  [CREATE_ZILLA_WARD.WARD_BN]: yup
    .string()
    .required('ZILLA_WARD_VALIDATION_ERROR_MSG.WARD_BN'),
  [CREATE_ZILLA_WARD.WARD_EN]: yup
    .string()
    .required('ZILLA_WARD_VALIDATION_ERROR_MSG.WARD_EN'),
  [CREATE_ZILLA_WARD.GO_CODE]: yup
    .string()
    .required('ZILLA_WARD_VALIDATION_ERROR_MSG.GO_CODE'),
});

export type CreateZillaWardDataType = yup.InferType<
  typeof createZillaWardValidation
>;
