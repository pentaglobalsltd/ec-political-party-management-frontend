import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const ELECTION_TYPE =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.OTHERS.ELECTION_TYPE;

export const electionTypeValidation = yup.object().shape({
  [ELECTION_TYPE.ELECTION_TYPE_BN]: yup
    .string()
    .required('ELECTION_TYPE_ERROR_MSG.ELECTION_TYPE_BN'),
  [ELECTION_TYPE.ELECTION_TYPE_EN]: yup
    .string()
    .required('ELECTION_TYPE_ERROR_MSG.ELECTION_TYPE_EN'),
});

export type ElectionTypeDataType = yup.InferType<typeof electionTypeValidation>;
