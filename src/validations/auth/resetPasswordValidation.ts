import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const RESET_PASSWORD = FORM_FIELDS.RESET_PASSWORD;

export const resetPasswordValidation = yup.object().shape({
  [RESET_PASSWORD.PASSWORD]: yup.string().required('পাসওয়ার্ড আবশ্যক'),
  [RESET_PASSWORD.CONFIRM_PASSWORD]: yup
    .string()
    .required('পুনরায় পাসওয়ার্ড আবশ্যক')
    .oneOf(
      [yup.ref(RESET_PASSWORD.PASSWORD)],
      'পাসওয়ার্ড এবং পুনরায়-পাসওয়ার্ড একই হতে হবে',
    ),
});
