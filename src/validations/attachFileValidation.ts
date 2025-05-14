import { FORM_FIELDS } from '@constants/forms';
import { fileValidation } from '@utils/file';
import * as yup from 'yup';

const SCHEDULE_INFORMATION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

export const attachFileValidation = yup.object().shape({
  [SCHEDULE_INFORMATION.UPLOAD_OTHER_FILES]: fileValidation(),
  [SCHEDULE_INFORMATION.UPLOAD_SCHEDULE_COPY]: fileValidation(),
});

export type FormData = yup.InferType<typeof attachFileValidation>;
