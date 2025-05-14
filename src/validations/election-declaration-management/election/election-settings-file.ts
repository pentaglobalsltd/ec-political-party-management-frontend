import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { fileRequiredValidation } from '@utils/file';

export const ELECTION_SETTINGS_FORM_FIELD =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.ELECTION_SETTINGS;

export const electionSettingsFileValidation = yup.object().shape({
  // তফসিল ফাইল আপলোড করুন
  [ELECTION_SETTINGS_FORM_FIELD.SCHEDULE_FILE]: fileRequiredValidation(),
});

export type ElectionSettingsFileValidationDataType = yup.InferType<
  typeof electionSettingsFileValidation
>;
