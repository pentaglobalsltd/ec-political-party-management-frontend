import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import {
  // mobileNumberValidation,
  mobileNumberNotRequiredValidation,
  telephoneNumberNotRequiredValidation,
} from '@validations/utils';

export const {
  PERSONAL_INFO,
  ADDRESS,
  EMERGENCY_CONTACT,
  CURRENT_WORKPLACE,
  CHILDREN,
  DATE,
} = FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.CANDIDATE;

export const childrenValidationSchema = yup.object().shape({
  [CHILDREN.IDX]: yup.string().nullable(),
  [CHILDREN.NAME]: yup.string().nullable(),
  //.required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.CHILDREN_NAME'), //Children's name is required
  [CHILDREN.EDUCATIONAL_QUALIFICATION]: yup.string().nullable(),
  [CHILDREN.DATE_OF_BIRTH]: yup.string().nullable(),
  // .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.CHILDREN_DATE_OF_BIRTH'), Children date of birth is required
  [CHILDREN.INSTITUTE_ADDRESS]: yup.string().nullable(),
  [CHILDREN.MARITAL_STATUS]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.CHILDREN_MARITAL_STATUS'), // Children marital status is required
});

export const personalInfoValidationSchema = yup.object().shape({
  [PERSONAL_INFO.CANDIDATE_NAME]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_NAME'), // Candidate's name is required

  [PERSONAL_INFO.NATIONAL_ID]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_NID'), // Naitonal ID is required

  [PERSONAL_INFO.FATHER_NAME]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_FATHER_NAME'), // Father's name is required

  [PERSONAL_INFO.MOTHER_NAME]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_MOTHER_NAME'), // Mother's name is required

  [PERSONAL_INFO.SPOUSE_NAME]: yup.string().nullable(),

  [PERSONAL_INFO.DATE_OF_BIRTH]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_DATE_OF_BIRTH'),

  [PERSONAL_INFO.AGE]: yup.string().nullable(),
  [PERSONAL_INFO.PLACE_OF_BIRTH]: yup.number().nullable(),
  [PERSONAL_INFO.ADDRESS_OF_PLACE_OF_BIRTH]: yup.string().nullable(),
  // .required(
  //   'CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_ADDRESS_OF_PLACE_OF_BIRTH',
  // ), Place of birth is required
  [PERSONAL_INFO.GENDER]: yup.string().nullable(),
  // .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_GENDER'), Gender is required
  [PERSONAL_INFO.MARITAL_STATUS]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_MARITAL_STATUS'), // Marital status is required
  [PERSONAL_INFO.OCCUPATION]: yup.string().nullable(),
  // .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_OCCUPATION'), Occupation is required
  [PERSONAL_INFO.SPOUSE_OCCUPATION]: yup.string().nullable(),

  [PERSONAL_INFO.CANDIDATE_TIN_NUMBER]: yup.string().nullable(),
  // .required(
  //   'CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_CANDIDATE_TIN_NUMBER',
  // ), Candidate's TIN number is required

  [ADDRESS.PERMANENT_ADDRESS]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_PERMANENT_ADDRESS'), // Permanent address is required

  [ADDRESS.PRESENT_ADDRESS]: yup
    .string()
    .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_PRESENT_ADDRESS'), // Present address is required

  [EMERGENCY_CONTACT.TELEPHONE_NUMBER]: telephoneNumberNotRequiredValidation, //Telephone number is required
  [EMERGENCY_CONTACT.MOBILE_NUMBER]: mobileNumberNotRequiredValidation, //Mobile number is required
  [EMERGENCY_CONTACT.EMAIL_ADDRESS]: yup
    .string()
    .nullable()
    .email('ই-মেইল সঠিক নয়'), //Email address is required
  [CURRENT_WORKPLACE.WORKPLACE_NAME]: yup.string().nullable(),
  // .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_WORKPLACE_NAME'), Workplace name is required
  [CURRENT_WORKPLACE.WORKPLACE_ADDRESS]: yup.string().nullable(),
  // .required('CANDIDATE_PERSONAL_INFO_ERROR_MSG.PERSONAL_WORKPLACE_ADDRESS'), Workplace address is required
  childrenInfo: yup.array().of(childrenValidationSchema),
});

export type PersonalInfoValidationSchemaType = yup.InferType<
  typeof personalInfoValidationSchema
>;

export type ChildrenValidationSchemaType = yup.InferType<
  typeof childrenValidationSchema
>;
