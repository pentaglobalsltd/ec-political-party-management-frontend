import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { fileRequiredValidation } from '@utils/file';

export const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

export const candidateVoteDetailsValidation = yup.object().shape({
  [SUBMIT_RESULTS.LEGAL_VOTE_COUNT]: yup
    .number()
    .min(0, 'SUBMIT_RESULTS.VALID_VOTE_AMOUNT_REQUIRED_ERROR_MSG')
    .typeError('SUBMIT_RESULTS.VALID_VOTE_AMOUNT_REQUIRED_ERROR_MSG')
    .nullable(),

  [SUBMIT_RESULTS.CHALLENGED_LEGAL_VOTE_COUNT]: yup
    .number()
    .min(0, 'SUBMIT_RESULTS.OBJECTIONAL_VALID_VOTE_AMOUNT_REQUIRED_ERROR_MSG')
    .typeError(
      'SUBMIT_RESULTS.OBJECTIONAL_VALID_VOTE_AMOUNT_REQUIRED_ERROR_MSG',
    )
    .nullable(),

  [SUBMIT_RESULTS.TOTAL_ROW_VOTE_COUNT]: yup
    .number()
    .min(0, 'SUBMIT_RESULTS.TOTAL_ROW_VALID_VOTE_AMOUNT_REQUIRED_ERROR_MSG')
    .typeError('SUBMIT_RESULTS.TOTAL_ROW_VALID_VOTE_AMOUNT_REQUIRED_ERROR_MSG')
    .nullable(),
});

export const submitResultsOpValidation = yup.object().shape({
  candidateVoteDetails: yup.array().of(candidateVoteDetailsValidation),
  [SUBMIT_RESULTS.TOTAL_LEGAL_VOTE_COUNT]: yup.number().nullable(),
  [SUBMIT_RESULTS.TOTAL_ILLEGAL_VOTE_COUNT]: yup
    .number()
    .min(0, 'SUBMIT_RESULTS.TOTAL_ILLEGAL_VOTER_NO_ERROR_MSG')
    .typeError('SUBMIT_RESULTS.TOTAL_ILLEGAL_VOTER_NO_REQUIRED_ERROR_MSG')
    .nullable(),
  [SUBMIT_RESULTS.NET_TOTAL]: yup
    .number()
    .min(0, 'SUBMIT_RESULTS.TOTAL_VOTE_ERROR_MSG')
    .nullable(),
  [SUBMIT_RESULTS.RESULT_FILE]: fileRequiredValidation(),
});

export type SubmitResultsOpValidationType = yup.InferType<
  typeof submitResultsOpValidation
>;
