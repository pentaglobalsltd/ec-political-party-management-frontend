import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const CONTESTING_CANDIDATES_MODAL =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.REPORT
    .CONTESTING_CANDIDATES_MODAL;

export const contestingCandidatesModalValidation = yup.object().shape({
  [CONTESTING_CANDIDATES_MODAL.VOTER_COUNT]: yup
    .string()
    .required('CONTESTING_CANDIDATES_LIST.VOTER_COUNT_ERROR_MSG'),
});

export type ContestingCandidatesModalDataType = yup.InferType<
  typeof contestingCandidatesModalValidation
>;
