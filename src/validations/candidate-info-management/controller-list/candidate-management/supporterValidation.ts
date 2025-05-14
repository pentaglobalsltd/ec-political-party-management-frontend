import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';

const CANDIDATE_MANAGEMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.SUPPORTER;

export const supporterValidation = yup.object().shape({
  [CANDIDATE_MANAGEMENT.NAME]: yup.string(),

  [CANDIDATE_MANAGEMENT.VOTER_NO]: yup.string(),

  [CANDIDATE_MANAGEMENT.ID]: yup.string(),

  [CANDIDATE_MANAGEMENT.DISTRICT]: yup.string(),

  [CANDIDATE_MANAGEMENT.ELECTION_SEAT]: yup.string(),

  [CANDIDATE_MANAGEMENT.SUB_DISTRICT]: yup.string(),

  [CANDIDATE_MANAGEMENT.RMO]: yup.string(),

  [CANDIDATE_MANAGEMENT.UNION]: yup.string(),

  [CANDIDATE_MANAGEMENT.VOTER_AREA]: yup.string(),

  [CANDIDATE_MANAGEMENT.ELECTION_AREA_NAME]: yup.string(),

  [CANDIDATE_MANAGEMENT.CANDIDATE_NAME]: yup.string(),

  [CANDIDATE_MANAGEMENT.CANDIDATE_ADDRESS]: yup.string(),

  [CANDIDATE_MANAGEMENT.VOTER_NO]: yup.string(),
});

export type SupporterDataType = yup.InferType<typeof supporterValidation>;
