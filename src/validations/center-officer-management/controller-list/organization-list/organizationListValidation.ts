import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { PHONE_NUMBER_REGEX_WITH_EMPTY_STRING } from '@constants/validation-string';

const CREATE_ORGANIZATION_LIST =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.ORGANIZATION_LIST
    .CREATE_ORGANIZATION_LIST;

export const createOrganizationListValidation = yup.object().shape({
  [CREATE_ORGANIZATION_LIST.DIVISION]: yup.string().nullable(),
  [CREATE_ORGANIZATION_LIST.DISTRICT]: yup.string().nullable(),
  [CREATE_ORGANIZATION_LIST.SUBDISTRICT]: yup.string().nullable(),
  [CREATE_ORGANIZATION_LIST.RMO]: yup.string().nullable(),
  [CREATE_ORGANIZATION_LIST.CITY_CORPORATION]: yup.string().nullable(),
  [CREATE_ORGANIZATION_LIST.UNION_OR_WARD]: yup
    .string()
    .required('ORGANIZATION_LIST_ERROR_MESSAGE.UNION_OR_WARD'),
  [CREATE_ORGANIZATION_LIST.ORGANIZATION_TYPE]: yup
    .string()
    .required('ORGANIZATION_LIST_ERROR_MESSAGE.ORGANIZATION_TYPE'),
  [CREATE_ORGANIZATION_LIST.ORGANIZATION_NAME_BN]: yup
    .string()
    .required('ORGANIZATION_LIST_ERROR_MESSAGE.ORGANIZATION_NAME_BN'),
  [CREATE_ORGANIZATION_LIST.ORGANIZATION_NAME_EN]: yup.string().nullable(),
  [CREATE_ORGANIZATION_LIST.ORGANIZATION_ADDRESS_BN]: yup
    .string()
    .required('ORGANIZATION_LIST_ERROR_MESSAGE.ORGANIZATION_ADDRESS_BN'),
  [CREATE_ORGANIZATION_LIST.ORGANIZATION_ADDRESS_EN]: yup.string().nullable(),
  [CREATE_ORGANIZATION_LIST.ORGANIZATION_EMAIL]: yup
    .string()
    .email('CUSTOM_ERROR_MSG.EMAIL_FORMAT')
    .nullable(),
  [CREATE_ORGANIZATION_LIST.CONTACT_NO]: yup
    .string()
    .matches(
      PHONE_NUMBER_REGEX_WITH_EMPTY_STRING,
      'CUSTOM_ERROR_MSG.MOBILE_NUMBER_FORMAT',
    )
    .nullable(),
  [CREATE_ORGANIZATION_LIST.CONDITION]: yup
    .string()
    .required('ORGANIZATION_LIST_ERROR_MESSAGE.CONDITION'),
});

export type createOrganizationListDataType = yup.InferType<
  typeof createOrganizationListValidation
>;
