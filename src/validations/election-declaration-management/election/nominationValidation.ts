import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const NOMINATION_LETTER =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.NOMINATION_LETTER;

export const nominationValidation = yup.object().shape({
  [NOMINATION_LETTER.ELECTION_TYPE]: yup
    .string()
    .required('NOMINATION_VALIDATION_ERROR_MSG.ELECTION_TYPE'),

  [NOMINATION_LETTER.CANDIDATE_TYPE]: yup
    .string()
    .required('NOMINATION_VALIDATION_ERROR_MSG.CANDIDATE_TYPE'),

  // [NOMINATION_LETTER.NOMINATION_FILE]: yup
  //   .object()
  //   .test('Required', 'ফাইল আবশ্যক', function (value) {
  //     if (Object.keys(value).length !== 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }),
});

export type NominationDataType = yup.InferType<typeof nominationValidation>;
