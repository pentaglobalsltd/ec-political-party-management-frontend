import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const ADD_UNION_RESERVED_SEAT =
  FORM_FIELDS.VOTE_CENTER_MANAGEMENT.MAIN_LIST.UNION_RESERVED_SEAT
    .ADD_UNION_RESERVED_SEAT;

export const addUnionReservedSeatValidation = yup.object().shape({
  [ADD_UNION_RESERVED_SEAT.DIVISION]: yup.string().required('বিভাগ আবশ্যক'),

  [ADD_UNION_RESERVED_SEAT.DISTRICT]: yup.string().required('জেলা আবশ্যক'),

  [ADD_UNION_RESERVED_SEAT.SUB_DISTRICT]: yup
    .string()
    .required('উপজেলা আবশ্যক'),

  [ADD_UNION_RESERVED_SEAT.UNION]: yup
    .string()
    .required('ইউনিয়ন/ওয়ার্ড আবশ্যক'),

  [ADD_UNION_RESERVED_SEAT.UNION_WARD_MULTI]: yup
    .array()
    .of(yup.number())
    .required('সর্বনিম্ন ১ টি অন্তর্ভুক্তি আবশ্যক'),

  [ADD_UNION_RESERVED_SEAT.RESERVED_WARD_CODE]: yup
    .string()
    .required(' সংরক্ষিত ওয়ার্ড নম্বর আবশ্যক')
    .matches(
      CHECK_ONLY_NUMBER,
      ' সংরক্ষিত ওয়ার্ড নম্বর শুধুমাত্র সংখ্যা  হওয়া আবশ্যক',
    ),

  [ADD_UNION_RESERVED_SEAT.RESERVED_WARD_NAME_BN]: yup
    .string()
    .required('সংরক্ষিত ওয়ার্ড (বাংলা) আবশ্যক'),

  [ADD_UNION_RESERVED_SEAT.RESERVED_WARD_NAME_EN]: yup
    .string()
    .required('সংরক্ষিত ওয়ার্ড (ইংলিশ) আবশ্যক'),
});

export type AddUnionReservedSeatDataType = yup.InferType<
  typeof addUnionReservedSeatValidation
>;
