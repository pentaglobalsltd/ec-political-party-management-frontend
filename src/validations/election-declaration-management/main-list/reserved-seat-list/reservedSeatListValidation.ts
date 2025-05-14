import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const RESERVED_SEAT_LIST =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.RESERVED_SEAT_LIST
    .CREATE_RESERVED_SEAT_LIST;

export const reservedSeatListValidation = yup.object().shape({
  [RESERVED_SEAT_LIST.RMO]: yup
    .string()
    .required('RESERVED_SEAT_LIST_ERROR_MSG.RMO'),
  [RESERVED_SEAT_LIST.DIVISION]: yup
    .string()
    .required('RESERVED_SEAT_LIST_ERROR_MSG.DIVISION'),
  [RESERVED_SEAT_LIST.DISTRICT]: yup
    .string()
    .required('RESERVED_SEAT_LIST_ERROR_MSG.DISTRICT'),
  [RESERVED_SEAT_LIST.MUNICIPALITY]: yup
    .string()
    .required('RESERVED_SEAT_LIST_ERROR_MSG.MUNICIPALITY'),
  [RESERVED_SEAT_LIST.SUB_DISTRICT]: yup.string(),
  [RESERVED_SEAT_LIST.RESERVED_WARD_NO]: yup
    .string()
    .required('RESERVED_SEAT_LIST_ERROR_MSG.RESERVED_WARD_NO')
    .matches(
      CHECK_ONLY_NUMBER,
      'RESERVED_SEAT_LIST_ERROR_MSG.RESERVED_WARD_NO_NUMBER',
    ),
  [RESERVED_SEAT_LIST.RESERVED_WARD_BN]: yup
    .string()
    .required('RESERVED_SEAT_LIST_ERROR_MSG.RESERVED_WARD_BN'),
  [RESERVED_SEAT_LIST.RESERVED_WARD_EN]: yup
    .string()
    .required('RESERVED_SEAT_LIST_ERROR_MSG.RESERVED_WARD_EN'),
  [RESERVED_SEAT_LIST.INCLUSION]: yup
    .array()
    .of(yup.number())
    .required('RESERVED_SEAT_LIST_ERROR_MSG.INCLUSION'),
  [RESERVED_SEAT_LIST.CONDITION]: yup
    .string()
    .required('RESERVED_SEAT_LIST_ERROR_MSG.CONDITION'),
});

export type ReservedSeatListDataType = yup.InferType<
  typeof reservedSeatListValidation
>;
