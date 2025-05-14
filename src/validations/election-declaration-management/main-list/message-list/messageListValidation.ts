import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

export const MESSAGE_LIST =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.MESSAGE_LIST;

export const messageListChildrenValidation = yup.object().shape({
  [MESSAGE_LIST.EVENT_BN]: yup
    .string()
    .required('MESSAGE_LIST_ERROR_MSG.EVENT_BN'),
  [MESSAGE_LIST.EVENT_EN]: yup
    .string()
    .required('MESSAGE_LIST_ERROR_MSG.EVENT_EN'),
});

export const messageListValidation = yup.object().shape({
  messageList: yup.array().of(messageListChildrenValidation),
});

export type MessageListValidationType = yup.InferType<
  typeof messageListValidation
>;
