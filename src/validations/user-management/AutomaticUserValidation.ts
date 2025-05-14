import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const AUTOMATIC_USER = FORM_FIELDS.USER_MANAGEMENT.AUTOMATIC_USER;

export const automaticUserValidation = yup.object().shape({
  [AUTOMATIC_USER.USER_TYPE_CODE]: yup
    .string()
    .required('AUTOMATIC_USER_ERROR_MSG.ELECTION_SCHEDULE'),
  [AUTOMATIC_USER.ELECTION_SCHEDULE]: yup
    .string()
    .required('AUTOMATIC_USER_ERROR_MSG.USER_TYPE_CODE'),
});

export type AutomaticUserDataType = yup.InferType<
  typeof automaticUserValidation
>;
