import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

import {
  CHECK_ONLY_NUMBER,
  CHECK_TIN_NUMBER_AND_EMPTY,
} from '@constants/validation-string';

const CANDIDATE_PERSONAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_PERSONAL_INFO;

export const personalInfoValidation = yup.object().shape({
  // প্রার্থীর নাম
  [CANDIDATE_PERSONAL_INFO.NAME]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_NAME'),

  // জাতীয় পরিচয় পত্র (NID) নম্বর
  [CANDIDATE_PERSONAL_INFO.NID_NO]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_NID_NO'),

  // পিতা/স্বামীর নাম
  [CANDIDATE_PERSONAL_INFO.FATHER_OR_HUSBAND_NAME]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_FATHER_OR_HUSBAND_NAME'),

  // মাতার নাম
  [CANDIDATE_PERSONAL_INFO.MOTHER_NAME]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_MOTHER_NAME'),

  // প্রার্থীর ঠিকানা
  [CANDIDATE_PERSONAL_INFO.PERMANENT_ADDRESS]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_PERMANENT_ADDRESS'),

  // প্রার্থীর ভোটার নম্বর
  [CANDIDATE_PERSONAL_INFO.VOTER_NUMBER]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_VOTER_NUMBER'),

  // ক্রমিক নম্বর *
  [CANDIDATE_PERSONAL_INFO.SERIAL_NUMBER]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_SERIAL_NO'),

  // বিভাগের নাম
  [CANDIDATE_PERSONAL_INFO.REGION_ID]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_REGION_ID'),

  // জেলার নাম
  [CANDIDATE_PERSONAL_INFO.ZILLA_ID]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_ZILLA_ID'),

  // উপজেলা/থানা
  [CANDIDATE_PERSONAL_INFO.UPAZILA_ID]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_UPAZILA_ID'),

  // পৌরসভা/সিটি কর্পোরেশন/ক্যান্টনমেন্ট বোর্ড/ইউনিয়নের নাম
  [CANDIDATE_PERSONAL_INFO.RMO_EN]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_RMO_EN'),

  // ইউনিয়ন/ওয়ার্ড
  [CANDIDATE_PERSONAL_INFO.UNION_OR_WARD_ID]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_UNION_OR_WARD_ID'),

  // ইউনিয়ন/ওয়ার্ড
  [CANDIDATE_PERSONAL_INFO.UP_WARD_ID]: yup.string().nullable(),

  // ভোটার এলাকা
  [CANDIDATE_PERSONAL_INFO.VOTER_AREA_ID]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_VOTER_AREA_ID'),

  // ========= Announcement =========

  //
  [CANDIDATE_PERSONAL_INFO.BANK_ACCOUNT_NO]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_BANK_ACCOUNT_NO')
    .matches(
      CHECK_ONLY_NUMBER,
      'THIRD_PART_ERROR_MSG.CANDIDATE_BANK_ACCOUNT_NO_FORMAT',
    ),

  //
  [CANDIDATE_PERSONAL_INFO.BANK_ID]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_BANK_ID')
    .matches(CHECK_ONLY_NUMBER, 'THIRD_PART_ERROR_MSG.CANDIDATE_BANK_ID'),

  //
  [CANDIDATE_PERSONAL_INFO.BANK_BRANCH_NAME]: yup
    .string()
    .required('THIRD_PART_ERROR_MSG.CANDIDATE_BANK_BRANCH_NAME'),

  //
  [CANDIDATE_PERSONAL_INFO.TIN_NUMBER]: yup
    .string()
    .nullable()
    .matches(
      CHECK_TIN_NUMBER_AND_EMPTY,
      'THIRD_PART_ERROR_MSG.CANDIDATE_TIN_NUMBER_FORMAT',
    ),
});
