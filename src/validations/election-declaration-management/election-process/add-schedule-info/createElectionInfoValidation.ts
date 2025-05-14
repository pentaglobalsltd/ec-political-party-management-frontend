import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';

const { ELECTION_SCHEDULE_MANAGEMENT } = FORM_FIELDS;
const { CREATE_ELECTION_INFO } = ELECTION_SCHEDULE_MANAGEMENT;

export const createElectionInfoValidation = yup.object().shape({
  // ফলাফল গেজেটের তারিখ
  [CREATE_ELECTION_INFO.RESULT_GAZETTE_DATE]: yup
    .string()
    .required('ADD_SCHEDULE_INFO.ERROR_MESSAGE.RESULT_GAZATTE_DATE_REQUIRED'),

  // ফলাফল গেজেটের ফাইল
  [CREATE_ELECTION_INFO.RESULT_GAZETTE_FILE]: yup.mixed().nullable(),

  // শপথ গ্রহণের তারিখ
  [CREATE_ELECTION_INFO.SWEAR_DATE]: yup
    .string()
    .required('ADD_SCHEDULE_INFO.ERROR_MESSAGE.OATH_DATE_REQUIRED'),

  // শপথ গ্রহণের ফাইল
  [CREATE_ELECTION_INFO.SWEAR_FILE]: yup.mixed().nullable(),

  // প্রথম সভার তারিখ
  [CREATE_ELECTION_INFO.FIRST_MEETING_DATE]: yup
    .string()
    .required('ADD_SCHEDULE_INFO.ERROR_MESSAGE.FIRST_MEETING_DATE_REQUIRED'),

  // প্রথম সভার ফাইল
  [CREATE_ELECTION_INFO.FIRST_MEETING_FILE]: yup.mixed().nullable(),

  // সর্বশেষ মামলা সংকান্ত তথ্য
  [CREATE_ELECTION_INFO.LATEST_CASE_DETAIL]: yup.string().nullable(),
  // .required('Latest Case Detail is required'),

  // সর্বশেষ মামলা সংকান্ত তথ্য ফাইল
  [CREATE_ELECTION_INFO.LATEST_CASE_FILE]: yup.mixed().nullable(),

  // নির্বাচনী আসন পুনর্বিন্যাস
  [CREATE_ELECTION_INFO.ELECTORAL_AREA_REORGANIZED]: yup.string().nullable(),

  // পরবর্তী নির্বাচন অনুষ্ঠানের তারিখ
  [CREATE_ELECTION_INFO.NEXT_ELECTION_DATE]: yup.string().nullable(),

  // পরবর্তী পুনঃনির্বাচন তারিখ
  [CREATE_ELECTION_INFO.NEXT_GENERAL_ELECTION_DATE]: yup.string().nullable(),
});

export type CreateElectionInfoDataType = yup.InferType<
  typeof createElectionInfoValidation
>;
