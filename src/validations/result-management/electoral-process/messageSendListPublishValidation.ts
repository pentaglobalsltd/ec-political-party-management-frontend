import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const MESSAGE_SEND_LIST_PUBLISH =
  FORM_FIELDS.RESULT_MANAGEMENT.MESSAGE_SEND_LIST_PUBLISH;

export const messageSendListPublishValidation = yup.object().shape({
  [MESSAGE_SEND_LIST_PUBLISH.CHECK]: yup.boolean(),
  [MESSAGE_SEND_LIST_PUBLISH.FINAL_FILE]: yup
    .mixed()
    .nullable()
    .when(MESSAGE_SEND_LIST_PUBLISH.CHECK, (data: any, schema) => {
      if (data[0]) {
        return schema.test(
          'Required',
          'SUBMIT_RESULTS.FILE_REQUIRED',
          function (value) {
            if (value && Object.keys(value).length !== 0) {
              return true;
            } else {
              return false;
            }
          },
        );
      }
      return schema;
    }),
});

export type MessageSendListPublishValidationType = yup.InferType<
  typeof messageSendListPublishValidation
>;
