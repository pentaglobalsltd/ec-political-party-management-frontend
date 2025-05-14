import * as yup from 'yup';

import {
  CHECK_ONLY_NUMBER,
  CHECK_ONLY_NUMBER_AND_STRING,
  PHONE_NUMBER_REGEX,
} from '@constants/validation-string';
import { PHONE_NUMBER_REGEX_WITH_EMPTY_STRING } from '../constants/validation-string';

const FILE_SIZE = 50000000;
const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png'];
const SUPPORTED_FILE_FORMATS = ['file/pdf', 'application/pdf'];

export const mobileNumberValidation = yup
  .string()
  .required('CUSTOM_ERROR_MSG.MOBILE_NUMBER')
  .matches(PHONE_NUMBER_REGEX, 'CUSTOM_ERROR_MSG.MOBILE_NUMBER_FORMAT');

export const mobileNumberNotRequiredValidation = yup
  .string()
  .nullable()
  .matches(
    PHONE_NUMBER_REGEX_WITH_EMPTY_STRING,
    'CUSTOM_ERROR_MSG.MOBILE_NUMBER_FORMAT',
  );

export const telephoneNumberValidation = yup
  .string()
  .required('মোবাইল নম্বর আবশ্যক')
  .matches(CHECK_ONLY_NUMBER, 'টেলিফোন নম্বরটি সঠিক নয়');

export const telephoneNumberNotRequiredValidation = yup
  .string()
  .nullable()
  .matches(
    CHECK_ONLY_NUMBER_AND_STRING,
    'CUSTOM_ERROR_MSG.TELEPHONE_NUMBER_FORMAT',
  );

export const emailValidation = yup
  .string()
  .email('CUSTOM_ERROR_MSG.EMAIL_FORMAT')
  .required('CUSTOM_ERROR_MSG.EMAIL');

export const emailNotRequiredValidation = yup
  .string()
  .email('CUSTOM_ERROR_MSG.EMAIL_FORMAT');

export const nidValidation = yup
  .string()
  .min(10, 'CUSTOM_ERROR_MSG.NID_NUMBER_MIN')
  .max(17, 'CUSTOM_ERROR_MSG.NID_NUMBER_MAX')
  .required('CUSTOM_ERROR_MSG.NID_NUMBER')
  .matches(CHECK_ONLY_NUMBER, 'CUSTOM_ERROR_MSG.NID_NUMBER_FORMAT');

export const imageValidation = (
  size = FILE_SIZE,
  supportedFiles = SUPPORTED_IMAGE_FORMATS,
) =>
  yup
    .mixed()
    .nullable()
    .notRequired()
    .test('FILE_SIZE', 'ছবি আবশ্যক', (value: any) => {
      //Image file is required
      return !value || value?.length > 0;
    })
    .test('FILE_SIZE', 'ছবি অনেক বড়', (value: any) => {
      //Image file is too big.
      return (
        !value ||
        (value &&
          value?.length &&
          value?.length > 0 &&
          Array.from(value)?.filter(
            (item, index) => (value[index].size || 0) <= size,
          )?.length > 0)
      );
    })
    .test('FILE_FORMATE', 'ছবির ফরম্যাট গ্রহণযোগ্য নয়', (value: any) => {
      //Image file has unsupported format
      return (
        !value ||
        (value &&
          value?.length &&
          value?.length > 0 &&
          Array.from(value)?.filter((item, index) =>
            supportedFiles.includes(value[index].type || 'image/png'),
          )?.length > 0)
      );
    });

export const fileValidation = (
  size = FILE_SIZE,
  supportedFiles = SUPPORTED_FILE_FORMATS,
) =>
  yup
    .mixed()
    .nullable()
    .notRequired()
    .test('FILE_SIZE', 'ফাইল আবশ্যক', (value: any) => {
      //File is required
      return !value || value?.length > 0;
    })
    .test('FILE_SIZE', 'ফাইল অনেক বড়', (value: any) => {
      //File is too big
      return (
        !value ||
        (value &&
          value?.length &&
          value?.length > 0 &&
          Array.from(value)?.filter(
            (item, index) => (value[index].size || 0) <= size,
          )?.length > 0)
      );
    })
    .test('FILE_FORMAT', 'ফাইল ফরম্যাট গ্রহণযোগ্য নয়', (value: any) => {
      //File has unsupported format.
      return (
        !value ||
        (value &&
          value?.length &&
          value?.length > 0 &&
          Array.from(value)?.filter((item, index) =>
            supportedFiles.includes(value[index].type || 'image/pdf'),
          )?.length > 0)
      );
    });

export function SelectMultiselectValidation(requiredName: string) {
  return yup.mixed().test('Required', requiredName, function (value) {
    if (!value) {
      return false;
    } else if (Array.isArray(value) && value.length === 0) {
      return false;
    } else {
      return true;
    }
  });
}

export const ageValidation = yup
  .string()
  .max(2, 'CUSTOM_ERROR_MSG.AGE_LIMIT')
  .required('CUSTOM_ERROR_MSG.AGE_REQUIRED')
  .matches(CHECK_ONLY_NUMBER, 'CUSTOM_ERROR_MSG.AGE_TYPE');
