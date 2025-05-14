import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

export const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

export const candidateVoteDetailsValidation = yup.object().shape({
  [SUBMIT_RESULTS.TOTAL_ROW_POSTAL_VOTE_COUNT]: yup
    .number()
    .min(0, 'SUBMIT_RESULTS.TOTAL_ROW_VALID_VOTE_AMOUNT_REQUIRED_ERROR_MSG')
    .typeError('SUBMIT_RESULTS.TOTAL_ROW_VALID_VOTE_AMOUNT_REQUIRED_ERROR_MSG')
    .nullable(),
});

export const postalBallotValidation = yup.object().shape({
  candidateVoteDetails: yup.array().of(candidateVoteDetailsValidation),
  [SUBMIT_RESULTS.RESULT_FILE_POSTAL]: yup.mixed().nullable(),
});

export type PostalBallotValidationType = yup.InferType<
  typeof postalBallotValidation
>;
