import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const ELECTION_TRANSFER_MODAL =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.ELECTION_TRANSFER
    .CONFIRMATION_MODAL;

export const electionMigrationValidation = yup.object().shape({
  [ELECTION_TRANSFER_MODAL.ELECTION_NAME]: yup
    .string()
    .required('ELECTION_TRANSFER.ELECTION_NAME_ERROR_MSG'),
  [ELECTION_TRANSFER_MODAL.ELECTION_CANDIDATE]: yup.boolean(),
  [ELECTION_TRANSFER_MODAL.ELECTION_CENTER]: yup.boolean(),
  [ELECTION_TRANSFER_MODAL.ELECTION_CENTER_OFFICER]: yup.boolean(),
});

export type ElectionMIgrationValidationType = yup.InferType<
  typeof electionMigrationValidation
>;
