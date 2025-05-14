import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import {
  emailValidation,
  mobileNumberValidation,
  telephoneNumberNotRequiredValidation,
} from '@validations/utils';

export const PERSONAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .PERSONAL.PERSONAL_INFO;
export const ADDRESS =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .PERSONAL.ADDRESS;
export const EMERGENCY_CONTACT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .PERSONAL.EMERGENCY_CONTACT;
export const CURRENT_WORKPLACE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .PERSONAL.CURRENT_WORKPLACE;
export const CHILDREN =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .PERSONAL.CHILDREN;

export const childrenValidationSchema = yup.object().shape({
  [CHILDREN.IDX]: yup.string(),
  [CHILDREN.NAME]: yup.string().required('সন্তানের নাম আবশ্যক'), //Children's name is required
  [CHILDREN.EDUCATIONAL_QUALIFICATION]: yup
    .string()
    .required('শিক্ষাগত যোগ্যতা আবশ্যক'), //Educational qualification  is required
  [CHILDREN.DATE_OF_BIRTH]: yup.string().required('জন্ম তারিখ আবশ্যক'), //Children date of birth is required
  [CHILDREN.INSTITUTE_ADDRESS]: yup
    .string()
    .required('পেশা ও কর্মস্থল/প্রতিষ্ঠানের ঠিকানা আবশ্যক'), //Institute address is required
  [CHILDREN.MARITAL_STATUS]: yup.string().required('বৈবাহিক অবস্থা আবশ্যক'), //Children marital status is required
});

export const personalInfoValidationSchema = yup.object().shape({
  [PERSONAL_INFO.CANDIDATE_NAME]: yup.string().required('প্রার্থীর নাম আবশ্যক'), //Candidate's name is required

  [PERSONAL_INFO.NATIONAL_ID]: yup.string().required('জাতীয় পরিচয়পত্র আবশ্যক'), //Naitonal ID is required
  [PERSONAL_INFO.FATHER_NAME]: yup.string().required('পিতার নাম আবশ্যক'), //Father's name is required
  [PERSONAL_INFO.MOTHER_NAME]: yup.string().required('মাতার নাম আবশ্যক'), //Mother's name is required
  [PERSONAL_INFO.SPOUSE_NAME]: yup.string(),

  [PERSONAL_INFO.DATE_OF_BIRTH]: yup.string().required('জন্মতারিখ আবশ্যক'),
  [PERSONAL_INFO.AGE]: yup.string(),
  [PERSONAL_INFO.PLACE_OF_BIRTH]: yup.number(),
  [PERSONAL_INFO.ADDRESS_OF_PLACE_OF_BIRTH]: yup
    .string()
    .required('জন্মস্থানের ঠিকানা আবশ্যক'), //Place of birth is required
  [PERSONAL_INFO.GENDER]: yup.string().required('লিঙ্গ আবশ্যক'), //Gender is required
  [PERSONAL_INFO.MARITAL_STATUS]: yup
    .string()
    .required('বৈবাহিক অবস্থা আবশ্যক'), //Marital status is required
  [PERSONAL_INFO.OCCUPATION]: yup.string().required('পেশা আবশ্যক'), //Occupation is required
  [PERSONAL_INFO.SPOUSE_OCCUPATION]: yup.string().nullable(),

  [PERSONAL_INFO.CANDIDATE_TIN_NUMBER]: yup
    .string()
    .required('প্রার্থীর TIN নম্বর আবশ্যক'), //Candidate's TIN number is required
  [ADDRESS.PERMANENT_ADDRESS]: yup.string().required('স্থায়ী ঠিকানা আবশ্যক'), //Permanent address is required
  [ADDRESS.PRESENT_ADDRESS]: yup.string().required('বর্তমান ঠিকানা আবশ্যক'), //Present address is required
  [EMERGENCY_CONTACT.TELEPHONE_NUMBER]: telephoneNumberNotRequiredValidation, //Telephone number is required
  [EMERGENCY_CONTACT.MOBILE_NUMBER]: mobileNumberValidation, //Mobile number is required
  [EMERGENCY_CONTACT.EMAIL_ADDRESS]: emailValidation, //Email address is required
  [CURRENT_WORKPLACE.WORKPLACE_NAME]: yup
    .string()
    .required('কর্মস্থলের নাম আবশ্যক'), //Workplace name is required
  [CURRENT_WORKPLACE.WORKPLACE_ADDRESS]: yup
    .string()
    .required('কর্মস্থলের ঠিকানা আবশ্যক'), //Workplace address is required
  childrenInfo: yup.array().of(childrenValidationSchema),
});

export type PersonalInfoValidationSchemaType = yup.InferType<
  typeof personalInfoValidationSchema
>;

export type ChildrenValidationSchemaType = yup.InferType<
  typeof childrenValidationSchema
>;
