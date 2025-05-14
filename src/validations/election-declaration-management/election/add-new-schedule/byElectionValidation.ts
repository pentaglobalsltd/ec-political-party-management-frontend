import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';

const BY_ELECTION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

export const byElectionValidation = yup.object().shape({
  [BY_ELECTION.BY_ELECTION]: yup.boolean(),
  [BY_ELECTION.SEAT_VACANCY_DATE]: yup.string().nullable(),
  [BY_ELECTION.REASON_OF_BY_ELECTION]: yup.string().nullable(),
  [BY_ELECTION.REMARK_ON_BY_ELECTION]: yup.string().nullable(),
});

export type ByElectionDataType = yup.InferType<typeof byElectionValidation>;
