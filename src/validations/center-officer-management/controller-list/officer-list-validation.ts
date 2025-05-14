import * as yup from 'yup';
import { nidValidation } from '@validations/utils';
import { FORM_FIELDS } from '@constants/forms';
import {
  CHECK_ONLY_NUMBER,
  PHONE_NUMBER_REGEX,
} from '@constants/validation-string';

const CREATE_OFFICER_LIST =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.OFFICER_LIST
    .CREATE_OFFICER_LIST;

export const createOfficerListValidation = yup.object().shape({
  [CREATE_OFFICER_LIST.AGENCY]: yup
    .string()
    .required('OFFICER_LIST.AGENCY_VALIDATION_MESSAGE'),
  [CREATE_OFFICER_LIST.NID_NUMBER]: nidValidation,
  [CREATE_OFFICER_LIST.OWN_DISTRICT]: yup.string().nullable(),
  // .required('OFFICER_LIST.OWN_DISTRICT_VALIDATION_MESSAGE'),
  [CREATE_OFFICER_LIST.DATE_OF_BIRTH]: yup
    .string()
    .required('OFFICER_LIST.DATE_OF_BIRTH_VALIDATION_MESSAGE'),
  [CREATE_OFFICER_LIST.AGE]: yup
    .string()
    .max(2, 'CUSTOM_ERROR_MSG.AGE_LIMIT')
    .matches(CHECK_ONLY_NUMBER, 'CUSTOM_ERROR_MSG.AGE_TYPE')
    .nullable(),
  [CREATE_OFFICER_LIST.DESIGNATION_BN]: yup.string().nullable(),
  [CREATE_OFFICER_LIST.MOBILE_NUMBER]: yup
    .string()
    .matches(PHONE_NUMBER_REGEX, 'CUSTOM_ERROR_MSG.MOBILE_NUMBER_FORMAT')
    .required('OFFICER_LIST.MOBILE_NUMBER_VALIDATION_MESSAGE'),
  [CREATE_OFFICER_LIST.BASIC_SALARY]: yup
    .string()
    .max(7, 'OFFICER_LIST.BASIC_SALARY_LIMIT_VALIDATION_MESSAGE')
    .matches(
      CHECK_ONLY_NUMBER,
      'OFFICER_LIST.BASIC_SALARY_NUMBER_VALIDATION_MESSAGE',
    )
    .required('OFFICER_LIST.BASIC_SALARY_VALIDATION_MESSAGE'),
  [CREATE_OFFICER_LIST.PAY_SCALE]: yup
    .string()
    .required('OFFICER_LIST.PAY_SCALE_VALIDATION_MESSAGE'),
  [CREATE_OFFICER_LIST.CURRENT_WORK_ADDRESS]: yup.string().nullable(),
  [CREATE_OFFICER_LIST.PROBABLE_OFFICER_GROUP]: yup
    .string()
    .required('OFFICER_LIST.PROBABLE_OFFICER_GROUP_VALIDATION_MESSAGE'),
});

export type CreateOfficerListDataType = yup.InferType<
  typeof createOfficerListValidation
>;
