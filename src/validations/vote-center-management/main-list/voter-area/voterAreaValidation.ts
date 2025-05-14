import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const CREATE_VOTER_AREA =
  FORM_FIELDS.VOTE_CENTER_MANAGEMENT.MAIN_LIST.VOTER_AREA.CREATE_VOTER_AREA;

export const createVoterAreaValidation = yup.object().shape({
  [CREATE_VOTER_AREA.DISTRICT]: yup.string().required('জেলা আবশ্যক'),

  [CREATE_VOTER_AREA.SUB_DISTRICT]: yup.string().nullable(),

  [CREATE_VOTER_AREA.CITY_CORPORATION]: yup.string().nullable(),
  [CREATE_VOTER_AREA.UNION_OR_WARD]: yup
    .string()
    .required('ইউনিয়ন/ওয়ার্ড আবশ্যক'),

  [CREATE_VOTER_AREA.VOTER_AREA_CODE]: yup
    .string()
    .required('ভোটার এরিয়া কোড আবশ্যক')
    .matches(
      CHECK_ONLY_NUMBER,
      'ভোটার এরিয়া কোড শুধুমাত্র সংখ্যা  হওয়া আবশ্যক',
    )
    .length(4, 'ভোটার এরিয়া কোড ৪ সংখ্যার হওয়া আবশ্যক'),
  [CREATE_VOTER_AREA.VOTER_AREA_NAME_IN_ENGLISH]: yup
    .string()
    .required('ভোটার এলাকার নাম (ইংরেজিতে) আবশ্যক'),

  [CREATE_VOTER_AREA.VOTER_AREA_NAME_IN_BANGLA]: yup
    .string()
    .required('ভোটার এলাকার নাম (বাংলায়) আবশ্যক'),

  [CREATE_VOTER_AREA.MALE_VOTER]: yup
    .number()
    .typeError('পুরুষ ভোটার আবশ্যক')
    .required('পুরুষ ভোটার আবশ্যক'),

  [CREATE_VOTER_AREA.FEMALE_VOTER]: yup
    .number()
    .typeError('মহিলা ভোটার আবশ্যক')
    .required('মহিলা ভোটার আবশ্যক'),

  [CREATE_VOTER_AREA.THIRD_GENDER_VOTER]: yup
    .number()
    .typeError('হিজড়া ভোটার আবশ্যক')
    .required('হিজড়া ভোটার আবশ্যক'),
  [CREATE_VOTER_AREA.TOTAL_VOTER]: yup
    .number()
    .typeError('সংখ্যা প্রদান আবশ্যক'),
});

export type CreateVoterAreaDataType = yup.InferType<
  typeof createVoterAreaValidation
>;
