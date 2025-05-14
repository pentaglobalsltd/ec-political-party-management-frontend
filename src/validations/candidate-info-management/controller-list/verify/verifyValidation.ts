import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

export const CANDIDATE_VERIFY =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_VERIFY
    .VIEW_CANDIDATE_VERIFY;

export const candidateVerifyValidation = yup.object().shape({
  [CANDIDATE_VERIFY.IS_CANDIDATE_INFO_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_PROPOSER_INFO_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_VERIFIER_INFO_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_CANDIDATE_PERSONAL_INFO_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_HALAFNAMA_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_ATTACHMENT_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_CANDIDATE_AGE_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_CANDIDATE_VOTER_NO_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_PROPOSER_VOTER_NO_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.IS_SUPPORTER_VOTER_NO_CORRECT]: yup
    .boolean()
    .required()
    .oneOf([true], 'VERIFY_ERROR_MSG.CHECKBOX'),
  [CANDIDATE_VERIFY.COMMENT]: yup.string().required('VERIFY_ERROR_MSG.COMMENT'),
});

export type CandidateVerifyTypeDataType = yup.InferType<
  typeof candidateVerifyValidation
>;
