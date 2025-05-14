import * as yup from 'yup';

import { emailValidation, mobileNumberValidation } from '@validations/utils';
import { FORM_FIELDS } from '@constants/forms';

const UPDATE_PROFILE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .UPDATE_PROFILE;

export const updateProfileValidation = yup.object().shape({
  [UPDATE_PROFILE.PHONE]: mobileNumberValidation,
  [UPDATE_PROFILE.EMAIL]: emailValidation,
});
