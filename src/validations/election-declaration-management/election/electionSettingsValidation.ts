import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const ELECTION_SETTINGS =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.ELECTION_SETTINGS;

export const changedSettingsModalValidation = yup.object().shape({
  [ELECTION_SETTINGS.TAB_CENTER]: yup
    .string()
    .required('tab center is required'),
  [ELECTION_SETTINGS.EVM]: yup.string().required('evm is required'),
  [ELECTION_SETTINGS.AREA_VOTE_CENTER]: yup.boolean(),
  [ELECTION_SETTINGS.ELECTION_BY_TAB]: yup.boolean(),
  [ELECTION_SETTINGS.ELECTION_BY_EVM]: yup.boolean(),
});

export const newElectionSettingsValidation = yup.object().shape({
  [ELECTION_SETTINGS.ELECTION_TYPE]: yup
    .string()
    .required('নির্বাচনের ধরন আবশ্যক'),
  [ELECTION_SETTINGS.ELECTION_NAME]: yup
    .string()
    .required('নির্বাচনের নাম আবশ্যক'),
  [ELECTION_SETTINGS.CANDIDATE_TYPE]: yup
    .string()
    .required('প্রার্থীর ধরন আবশ্যক'),
  [ELECTION_SETTINGS.SCHEDULE_FILE_UPLOAD]: yup.mixed().nullable(),
  [ELECTION_SETTINGS.NOMINATION_SUBMISSION_LAST_DATE]: yup.string(),
  [ELECTION_SETTINGS.AREA_VOTE_CENTER]: yup.boolean(),
  [ELECTION_SETTINGS.ELECTION_BY_TAB]: yup.boolean(),
  [ELECTION_SETTINGS.ELECTION_BY_EVM]: yup.boolean(),
});

export type ChangedSettingsModalDataType = yup.InferType<
  typeof changedSettingsModalValidation
>;
export type NewElectionSettingsDataType = yup.InferType<
  typeof newElectionSettingsValidation
>;
