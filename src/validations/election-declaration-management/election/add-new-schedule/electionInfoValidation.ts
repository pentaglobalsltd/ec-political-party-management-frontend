import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const ELECTION_INFORMATION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

export const electionInfoValidation = yup.object().shape({
  [ELECTION_INFORMATION.MINIMUM_AGE]: yup
    .number()
    .required('ELECTION_INFO_VALIDATION_ERROR_MSG.MINIMUM_AGE_FORMAT')
    .moreThan(0, 'ELECTION_INFO_VALIDATION_ERROR_MSG.MINIMUM_AGE_POSITIVE'),

  [ELECTION_INFORMATION.DATE_UPTO_WHICH_AGE_WILL_BE_CALCULATED]: yup
    .string()
    .required(
      'ELECTION_INFO_VALIDATION_ERROR_MSG.DATE_UPTO_WHICH_AGE_WILL_BE_CALCULATED',
    ),
  [ELECTION_INFORMATION.TOTAL_REGIONS]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message: 'ELECTION_INFO_VALIDATION_ERROR_MSG.TOTAL_REGIONS_FORMAT',
    }),
  [ELECTION_INFORMATION.TOTAL_DISTRICTS]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message: 'ELECTION_INFO_VALIDATION_ERROR_MSG.TOTAL_DISTRICTS_FORMAT',
    }),
  [ELECTION_INFORMATION.POLLING_CENTER]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message: 'ELECTION_INFO_VALIDATION_ERROR_MSG.POLLING_CENTER_FORMAT',
    }),
  [ELECTION_INFORMATION.POLLING_BOOTH]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message: 'ELECTION_INFO_VALIDATION_ERROR_MSG.POLLING_BOOTH_FORMAT',
    }),
  [ELECTION_INFORMATION.SEAT_NUMBERS]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER, {
      excludeEmptyString: true,
      message: 'ELECTION_INFO_VALIDATION_ERROR_MSG.SEAT_NUMBERS_FORMAT',
    }),
});

export type ElectionInfoDataType = yup.InferType<typeof electionInfoValidation>;
