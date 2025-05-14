import { FORM_FIELDS } from '@constants/forms';
import * as yup from 'yup';

export const FIRST_STEP_AFFIDAVIT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.AFFIDAVIT.FIRST_STEP;

// export const ATTACH_FILE = FORM_FIELDS.ATTACH_FILE;

export const candidatePersonalInfoValidation = yup.object().shape({
  [FIRST_STEP_AFFIDAVIT.CANDIDATE_NAME]: yup
    .string()
    .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PERSONAL_NAME'), //candidate name is a required field
  [FIRST_STEP_AFFIDAVIT.FATHER_HUSBAND_NAME]: yup
    .string()
    .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PERSONAL_FATHER_OR_HUSBAND_NAME'), //father or husband name is a required field
  [FIRST_STEP_AFFIDAVIT.MOTHER_NAME]: yup
    .string()
    .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PERSONAL_MOTHER_NAME'), //mother name is a required field
  [FIRST_STEP_AFFIDAVIT.CANDIDATE_ADDRESS]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PERSONAL_CANDIDATE_ADDRESS'), // TODO -> make hook
  [FIRST_STEP_AFFIDAVIT.DATE_OF_BIRTH]: yup.string().nullable(),
  [FIRST_STEP_AFFIDAVIT.CANDIDATES_HIGHER_DEGREE]: yup
    .string()
    .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PERSONAL_CANDIDATES_HIGHER_DEGREE'), //candidates higher degree is a required field
  [FIRST_STEP_AFFIDAVIT.NO_PRESENT_CRIMINAL_CASE]: yup.boolean(),
  [FIRST_STEP_AFFIDAVIT.OCCUPATION]: yup
    .string()
    .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PERSONAL_OCCUPATION'), //occupation is a required field
  [FIRST_STEP_AFFIDAVIT.NO_PAST_CRIMINAL_CASE_BEFORE]: yup.boolean(),
});

export const presentCaseValidation = yup.object().shape({
  [FIRST_STEP_AFFIDAVIT.ACCUSED_CASE]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PRESENT_ACCUSED_CASE'), //accused case is required
  [FIRST_STEP_AFFIDAVIT.COURT_NAME]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PRESENT_COURT_NAME'), //court name is required
  [FIRST_STEP_AFFIDAVIT.CASE_NUMBER]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PRESENT_CASE_NUMBER'), //case number is required
  [FIRST_STEP_AFFIDAVIT.CASE_STATUS]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PRESENT_CASE_STATUS'), //case status is required
  [FIRST_STEP_AFFIDAVIT.CASE_FILE]: yup.mixed().nullable(),
  // .test(
  //   'Required',
  //   'AFFIDAVIT_STEP_ONE_ERROR_MSG.PRESENT_CASE_FILE',
  //   function (value) {
  //     if (value && Object.keys(value).length !== 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // ),
});

export const pastCaseValidation = yup.object().shape({
  [FIRST_STEP_AFFIDAVIT.ACCUSED_CASE]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PAST_ACCUSED_CASE'), //accused case is required
  [FIRST_STEP_AFFIDAVIT.COURT_NAME]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PAST_COURT_NAME'), //court name is required
  [FIRST_STEP_AFFIDAVIT.CASE_NUMBER]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PAST_CASE_NUMBER'), //case number is required
  [FIRST_STEP_AFFIDAVIT.CASE_STATUS]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_ONE_ERROR_MSG.PAST_CASE_STATUS'), //case status is required
  [FIRST_STEP_AFFIDAVIT.CASE_FILE]: yup.mixed().nullable(),
  // .test(
  //   'Required',
  //   'AFFIDAVIT_STEP_ONE_ERROR_MSG.PAST_CASE_FILE',
  //   function (value) {
  //     if (value && Object.keys(value).length !== 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // ),
});

export const firstStepAffidavitFormValidationSchema = yup.object().shape({
  candidatePersonalInfo: candidatePersonalInfoValidation,
  presentCases: yup
    .array()
    .of(presentCaseValidation)
    .test('test', 'PresentCases', function (value) {
      const checkboxValue =
        this.parent.candidatePersonalInfo.noPresentCriminalCase;
      if (!checkboxValue) {
        return value?.every((obj) => {
          const objectKeys = Object.keys(obj);
          return !objectKeys.every((key) => !obj[key]);
        });
      }
      return true;
    }),
  pastCases: yup
    .array()
    .of(pastCaseValidation)
    .test('test', 'PastCases', function (value) {
      const checkboxValue =
        this.parent.candidatePersonalInfo.noPastCriminalCase;

      if (!checkboxValue) {
        return value?.every((obj) => {
          const objectKeys = Object.keys(obj);
          return !objectKeys.every((key) => !obj[key]);
        });
      }
      return true;
    }),
});

export type FirstStepAffidavitFormValidationSchemaType = yup.InferType<
  typeof firstStepAffidavitFormValidationSchema
>;

export type PresentCaseValidationSchemaType = yup.InferType<
  typeof presentCaseValidation
>;

export type PastCaseValidationSchemaType = yup.InferType<
  typeof pastCaseValidation
>;
