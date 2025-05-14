import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';

const CANDIDATE_MANAGEMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.NOMINATED_CANDIDATE;

export const nominatedCandidateValidation = yup.object().shape({
  [CANDIDATE_MANAGEMENT.CANDIDATE_NAME]: yup.string(),

  [CANDIDATE_MANAGEMENT.NID]: yup.string(),

  [CANDIDATE_MANAGEMENT.FATHER_NAME]: yup.string(),

  [CANDIDATE_MANAGEMENT.MOTHER_NAME]: yup.string(),

  [CANDIDATE_MANAGEMENT.ID]: yup.string(),

  [CANDIDATE_MANAGEMENT.DIVISION]: yup.string(),

  [CANDIDATE_MANAGEMENT.DISTRICT]: yup.string(),

  [CANDIDATE_MANAGEMENT.SUB_DISTRICT]: yup.string(),

  [CANDIDATE_MANAGEMENT.RMO]: yup.string(),

  [CANDIDATE_MANAGEMENT.UNION]: yup.string(),

  [CANDIDATE_MANAGEMENT.VOTER_AREA_NAME]: yup.string(),

  [CANDIDATE_MANAGEMENT.ADDRESS]: yup.string(),

  [CANDIDATE_MANAGEMENT.BANK_ACCOUNT_NO]: yup.string(),

  [CANDIDATE_MANAGEMENT.BANK_NAME]: yup.string(),

  [CANDIDATE_MANAGEMENT.BRANCH_NO]: yup.string(),

  [CANDIDATE_MANAGEMENT.INCOME_TAX]: yup.string(),

  [CANDIDATE_MANAGEMENT.TIN]: yup.string(),
});

export type NominatedCandidateDataType = yup.InferType<
  typeof nominatedCandidateValidation
>;
