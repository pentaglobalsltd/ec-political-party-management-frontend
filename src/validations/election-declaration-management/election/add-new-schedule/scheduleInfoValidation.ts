import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { fileRequiredValidation } from '@utils/file';

// const CREATE_VOTER_AREA = FORM_FIELDS.CREATE_VOTER_AREA;
const SCHEDULE_DECLARATION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

export const scheduleInfoValidation = yup.object().shape({
  // বাংলায়
  [SCHEDULE_DECLARATION.ELECTION_NAME_ENGLISH]: yup.string().nullable(),
  // In English
  [SCHEDULE_DECLARATION.ELECTION_NAME_BANGLA]: yup
    .string()
    .required('SCHEDULE_INFO_VALIDATION_ERROR_MSG.ELECTION_NAME_BANGLA'),

  // নির্বাচনের ধরণ
  [SCHEDULE_DECLARATION.ELECTION_TYPE]: yup
    .string()
    .required('SCHEDULE_INFO_VALIDATION_ERROR_MSG.ELECTION_TYPE'),

  // বিজ্ঞপ্তি তারিখ
  [SCHEDULE_DECLARATION.DATE_OF_DECLARATION]: yup
    .string()
    .required('SCHEDULE_INFO_VALIDATION_ERROR_MSG.DATE_OF_DECLARATION'),

  // মনোনয়নপত্র দাখিলের শেষ তারিখ
  [SCHEDULE_DECLARATION.NOMINATION_SUBMISSION_LAST_DATE]: yup
    .string()
    .required(
      'SCHEDULE_INFO_VALIDATION_ERROR_MSG.NOMINATION_SUBMISSION_LAST_DATE',
    ),

  // শুরু - মনোনয়নপত্র বাছাইয়ের তারিখ
  [SCHEDULE_DECLARATION.NOMINATION_SELECTION_DATE_RANGE_START]: yup.string(),

  // শেষ - মনোনয়নপত্র বাছাইয়ের তারিখ
  [SCHEDULE_DECLARATION.NOMINATION_SELECTION_DATE_RANGE_END]: yup.string(),
  // আপিলের তারিখ
  [SCHEDULE_DECLARATION.APPEAL_DATE]: yup.string(),

  // আপিলের রায় প্রদানের তারিখ
  [SCHEDULE_DECLARATION.APPEAL_JUDGEMENT_DATE]: yup.string(),

  // প্রার্থিতা প্রত্যাহারের শেষ তারিখ
  [SCHEDULE_DECLARATION.NOMINATION_WITHDRAWAL_LAST_DATE]: yup.string(),
  // প্রতীক বরাদ্দের তারিখ
  [SCHEDULE_DECLARATION.SYMBOL_ALLOCATION_DATE]: yup.string(),

  // ভোট গ্রহণের তারিখ
  [SCHEDULE_DECLARATION.DATE_OF_ELECTION]: yup
    .string()
    .required('SCHEDULE_INFO_VALIDATION_ERROR_MSG.DATE_OF_ELECTION'),

  // প্রজ্ঞাপন জারির তারিখ
  [SCHEDULE_DECLARATION.DATE_OF_GAZETTE]: yup.string(),
  // শুরু - ভোট গ্রহণের সময়সূচী
  [SCHEDULE_DECLARATION.VOTE_CASTING_START_TIME]: yup
    .string()
    .required('SCHEDULE_INFO_VALIDATION_ERROR_MSG.VOTE_CASTING_START_TIME'),

  // শেষ - ভোট গ্রহণের সময়সূচী
  [SCHEDULE_DECLARATION.VOTE_CASTING_END_TIME]: yup
    .string()
    .required('SCHEDULE_INFO_VALIDATION_ERROR_MSG.VOTE_CASTING_END_TIME'),

  // অনলাইন নমিনেশন
  [SCHEDULE_DECLARATION.ONLINE_NOMINATION]: yup
    .string()
    .required('SCHEDULE_INFO_VALIDATION_ERROR_MSG.ONLINE_NOMINATION'),

  // তফসিল মন্তব্য
  [SCHEDULE_DECLARATION.REMARKS_ON_SCHEDULE]: yup.string().nullable(),
  // তফসিল কপি আপলোড করুন
  [SCHEDULE_DECLARATION.UPLOAD_SCHEDULE_COPY]: fileRequiredValidation(),

  // অন্যান্য ফাইল আপলোড
  [SCHEDULE_DECLARATION.UPLOAD_OTHER_FILES]: yup.mixed(),
});

export type ScheduleInfoDataType = yup.InferType<typeof scheduleInfoValidation>;
