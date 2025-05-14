import { FORM_FIELDS } from '@constants/forms';
import * as yup from 'yup';

export const LIABILITIES =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.AFFIDAVIT.LIABILITY_LOAN_OATH
    .LIABILITIES;

export const AFFIDAVIT_COMMITMENT_ACHIEVEMENTS =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.AFFIDAVIT.LIABILITY_LOAN_OATH
    .COMMITMENT_ACHIEVEMENTS;

export const AFFIDAVIT_OATH =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.AFFIDAVIT.LIABILITY_LOAN_OATH
    .OATH;

export const LIABILITY_LOAN_OATH =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.AFFIDAVIT.LIABILITY_LOAN_OATH;

export const liabilities = yup.object().shape({
  [LIABILITIES.NATURE_LIABILITIES_DEBTS]: yup.string().nullable(),
  // .required(
  //   'AFFIDAVIT_STEP_FOUR_ERROR_MSG.LIABILITIES_NATURE_LIABILITIES_DEBTS',
  // ),
  [LIABILITIES.AMOUNT]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.LIABILITIES_AMOUNT'),
  [LIABILITIES.FILE]: yup.mixed().nullable(),
  // .test(
  //   'Required',
  //   'AFFIDAVIT_STEP_FOUR_ERROR_MSG.LIABILITIES_FILE',
  //   function (value) {
  //     if (value && Object.keys(value).length !== 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // ),
});

// ৭. (ক) আমি ইতিপূর্বে জাতীয় সংসদের সদস্য নির্বাচিত হই নাই
export const commitmentAchievement = yup.object().shape({
  // প্রতিশ্রুতি আবশ্যক
  [AFFIDAVIT_COMMITMENT_ACHIEVEMENTS.PROMISES]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.COMMITMENT_PROMISES'),

  // অর্জন আবশ্যক
  [AFFIDAVIT_COMMITMENT_ACHIEVEMENTS.ACHIEVEMENTS]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.COMMITMENT_ACHIEVEMENTS'),
});

export const oath = yup.object().shape({
  // এর মাধ্যমে সনাক্ত হইয়া অদ্য আবশ্যক"
  [AFFIDAVIT_OATH.HOLOFNAMA_SUBMISSION_DATE]: yup.string().nullable(),
  // .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_HOLOFNAMA_SUBMISSION_DATE'),

  magistrateNotaryPublic: yup.object().shape({
    // ম্যাজিস্ট্রেট/নোটারী পাবলিকের নাম আবশ্যক
    [AFFIDAVIT_OATH.MAGISTRATE_NOTARY_PUBLIC.NAME]: yup.string().nullable(),
    // .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_MAGISTRATE_NAME'),

    // ম্যাজিস্ট্রেট/ নোটারী পাবলিকের স্বাক্ষরের তারিখ আবশ্যক
    [AFFIDAVIT_OATH.MAGISTRATE_NOTARY_PUBLIC.SIGNING_DATE]: yup
      .string()
      .nullable(),
    // .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_MAGISTRATE_SIGNING_DATE'),
  }),

  identifierInfo: yup.object().shape({
    // যিনি জনাব/বেগম আবশ্যক
    [AFFIDAVIT_OATH.IDENTIFIER_INFO.NAME]: yup.string().nullable(),
    // .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_IDENTIFIER_NAME'),

    // ঠিকানা(সনাক্তকারীর) আবশ্যক
    [AFFIDAVIT_OATH.IDENTIFIER_INFO.ADDRESS]: yup.string().nullable(),
    // .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_IDENTIFIER_ADDRESS'),
  }),

  candidateInfo: yup.object().shape({
    [AFFIDAVIT_OATH.CANDIDATE_INFO.NAME]: yup
      .string()
      .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_CANDIDATE_NAME'),
    [AFFIDAVIT_OATH.CANDIDATE_INFO.FATHER_OR_HUSBAND_NAME]: yup
      .string()
      .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_CANDIDATE_FATHER_NAME'),
    [AFFIDAVIT_OATH.CANDIDATE_INFO.MOTHER_NAME]: yup
      .string()
      .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_CANDIDATE_MOTHER_NAME'),
    [AFFIDAVIT_OATH.CANDIDATE_INFO.ADDRESS]: yup
      .string()
      .required('AFFIDAVIT_STEP_FOUR_ERROR_MSG.OATH_ADDRESS'),
  }),
});

export const commitmentAchievements = yup
  .array()
  .of(commitmentAchievement)
  .test('test', 'CommitmentAchievement', function (value) {
    const checkboxValue = this.parent.notElectedBefore;
    if (!checkboxValue) {
      return value?.every((obj) => {
        const objectKeys = Object.keys(obj);

        return !objectKeys.every((key: any) => (!value[key] ? false : true));
      });
    }
    return true;
  });

export const liabilitiesFormValidationSchema = yup.object().shape({
  [LIABILITY_LOAN_OATH.NOT_ELECTED_BEFORE]: yup.boolean(),
  liabilities: yup.array().of(liabilities),
  oath: oath,
});

export type liabilitiesFormValidationSchemaType = yup.InferType<
  typeof liabilitiesFormValidationSchema
>;

export type liabilityFormValidationSchemaType = yup.InferType<
  typeof liabilities
>;

export type commitmentAchievementFormValidationSchemaType = yup.InferType<
  typeof commitmentAchievement
>;
