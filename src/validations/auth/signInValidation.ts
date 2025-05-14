import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';

const SIGN_IN = FORM_FIELDS.SIGN_IN;

export const signInValidation = yup.object().shape({
  [SIGN_IN.USERNAME]: yup.string().required('ইউজার আইডি আবশ্যক'),
  [SIGN_IN.PASSWORD]: yup.string().required('পাসওয়ার্ড আবশ্যক'),
});
