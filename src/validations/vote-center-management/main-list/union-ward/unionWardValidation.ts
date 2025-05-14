import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const ADD_UNION_WARD =
  FORM_FIELDS.VOTE_CENTER_MANAGEMENT.MAIN_LIST.UNION_WARD.ADD_UNION_WARD;

export const addUnionWardValidation = yup.object().shape({
  [ADD_UNION_WARD.DIVISION]: yup.string().required('বিভাগ আবশ্যক'),

  [ADD_UNION_WARD.DISTRICT]: yup.string().required('জেলা আবশ্যক'),

  [ADD_UNION_WARD.SUB_DISTRICT]: yup.string().required('উপজেলা আবশ্যক'),

  [ADD_UNION_WARD.UNION_OR_WARD]: yup.string().required('ইউনিয়ন/ওয়ার্ড আবশ্যক'),

  [ADD_UNION_WARD.WARD_NUMBER]: yup
    .string()
    .required('ওয়ার্ড নম্বর আবশ্যক')
    .matches(CHECK_ONLY_NUMBER, 'ওয়ার্ড নম্বর শুধুমাত্র সংখ্যা  হওয়া আবশ্যক'),
  [ADD_UNION_WARD.WARD_NAMEBN]: yup
    .string()
    .required('ওয়ার্ড নাম (বাংলা) আবশ্যক'),

  [ADD_UNION_WARD.WARD_NAMEEN]: yup
    .string()
    .required('ওয়ার্ড নাম (ইংলিশ) আবশ্যক'),
});

export type AddUnionWardDataType = yup.InferType<typeof addUnionWardValidation>;
