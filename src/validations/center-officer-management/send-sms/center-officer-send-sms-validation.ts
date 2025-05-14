import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const SEND_SMS = FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.SEND_SMS;

export const centerOfficerSendSMSValidation = yup.object().shape({
  [SEND_SMS.ELECTION_TYPE]: yup
    .string()
    .required('CENTER_OFFICER_SEND_SMS_ERROR_MSG.ELECTION_TYPE'),

  [SEND_SMS.ELECTION_SCHEDULE]: yup
    .string()
    .required('CENTER_OFFICER_SEND_SMS_ERROR_MSG.SCHEDULE_NAME'),

  [SEND_SMS.SMS_TEXT]: yup
    .string()
    .required('CENTER_OFFICER_SEND_SMS_ERROR_MSG.SMS_TEXT'),
});

export type CenterOfficerSendSMSDataType = yup.InferType<
  typeof centerOfficerSendSMSValidation
>;
