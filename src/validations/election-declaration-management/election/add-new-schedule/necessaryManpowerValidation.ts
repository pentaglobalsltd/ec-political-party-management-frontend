import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const NECESSARY_MANPOWER =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

export const necessaryManpowerValidation = yup.object().shape({
  [NECESSARY_MANPOWER.RETURNING_OFFICER]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message:
        'NECESSARY_MANPOWER_VALIDATION_ERROR_MSG.RETURNING_OFFICER_FORMAT',
    }),
  [NECESSARY_MANPOWER.ASSISTANT_RETURNING_OFFICER]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message:
        'NECESSARY_MANPOWER_VALIDATION_ERROR_MSG.ASSISTANT_RETURNING_OFFICER_FORMAT',
    }),
  [NECESSARY_MANPOWER.PRESIDING_OFFICER]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message:
        'NECESSARY_MANPOWER_VALIDATION_ERROR_MSG.PRESIDING_OFFICER_FORMAT',
    }),
  [NECESSARY_MANPOWER.ASSISTANT_PRESIDING_OFFICER]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message:
        'NECESSARY_MANPOWER_VALIDATION_ERROR_MSG.ASSISTANT_PRESIDING_OFFICER_FORMAT',
    }),
  [NECESSARY_MANPOWER.POLLING_OFFICER]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message: 'NECESSARY_MANPOWER_VALIDATION_ERROR_MSG.POLLING_OFFICER_FORMAT',
    }),
});

export type NecessaryManpowerDataType = yup.InferType<
  typeof necessaryManpowerValidation
>;
