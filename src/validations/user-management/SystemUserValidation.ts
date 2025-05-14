import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const SYSTEM_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

export const systemUserPasswordValidation = yup.object().shape({
  [SYSTEM_USER.PASSWORD]: yup
    .string()
    .required('SYSTEM_USER_ERROR_MSG.PASSWORD'),
  [SYSTEM_USER.CONFIRM_PASSWORD]: yup
    .string()
    .required('SYSTEM_USER_ERROR_MSG.CONFIRM_PASSWORD')
    .test('Required', 'SYSTEM_USER_ERROR_MSG.PASSWORD_MATCH', function (value) {
      const password = this.parent.password;
      if (value !== password) {
        return false;
      } else {
        return true;
      }
    }),
});

export const systemUserLogInIdValidation = yup.object().shape({
  [SYSTEM_USER.LOGIN_ID]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.LOGIN_ID'),
});

export const systemUserLogInIdValidationARO = yup.object().shape({
  [SYSTEM_USER.LOGIN_ID]: yup.string().nullable(),
});

export const systemUserValidation = yup.object().shape({
  [SYSTEM_USER.USER_ROLE]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.USER_ROLE'),
  [SYSTEM_USER.NAME]: yup.string().nullable(),
  [SYSTEM_USER.EMAIL]: yup
    .string()
    .nullable()
    .email('CUSTOM_ERROR_MSG.EMAIL_FORMAT'),
});

export type SystemUserDataType = yup.InferType<typeof systemUserValidation>;
export type SystemUserPasswordDataType = yup.InferType<
  typeof systemUserPasswordValidation
>;
