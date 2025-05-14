import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { fileRequiredValidation } from '@utils/file';

const MESSAGE_SEND_LIST_PREPARE =
  FORM_FIELDS.RESULT_MANAGEMENT.MESSAGE_SEND_LIST_PREPARE;

export const messageSendListPrepareValidation = yup.object().shape({
  [MESSAGE_SEND_LIST_PREPARE.ATTACH_FILE]: fileRequiredValidation(),
});

export type MessageSendListPrepareValidationType = yup.InferType<
  typeof messageSendListPrepareValidation
>;
