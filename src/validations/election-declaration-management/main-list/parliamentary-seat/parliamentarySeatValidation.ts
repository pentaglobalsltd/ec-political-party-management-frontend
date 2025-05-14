import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const PARLIAMENTARY_SEAT =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.PARLIAMENTARY_SEAT
    .CREATE_PARLIAMENTARY_SEAT;

export const parliamentarySeatValidation = yup.object().shape({
  [PARLIAMENTARY_SEAT.DIVISION]: yup
    .string()
    .required('PARLIAMENTARY_SEAT_VALIDATION_ERROR_MSG.DIVISION'),
  [PARLIAMENTARY_SEAT.DISTRICT]: yup
    .string()
    .required('PARLIAMENTARY_SEAT_VALIDATION_ERROR_MSG.DISTRICT'),
  [PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT]: yup
    .string()
    .required('PARLIAMENTARY_SEAT_VALIDATION_ERROR_MSG.PARLIAMENTARY_SEAT'),
  [PARLIAMENTARY_SEAT.SUB_DISTRICT]: yup
    .string()
    .required('PARLIAMENTARY_SEAT_VALIDATION_ERROR_MSG.SUB_DISTRICT'),
  [PARLIAMENTARY_SEAT.UNION]: yup
    .string()
    .required('PARLIAMENTARY_SEAT_VALIDATION_ERROR_MSG.UNION'),
});

export type ParliamentarySeatDataType = yup.InferType<
  typeof parliamentarySeatValidation
>;
