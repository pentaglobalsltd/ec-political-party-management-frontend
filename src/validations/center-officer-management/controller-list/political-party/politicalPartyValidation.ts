import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const POLITICAL_PARTY =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.POLITICAL_PARTY;

export const politicalPartyValidation = yup.object().shape({
  [POLITICAL_PARTY.REGISTRATION_NO]: yup
    .string()
    .required('রেজিস্ট্রেশন নম্বর প্রয়োজন'),
  [POLITICAL_PARTY.PARTY_NAME_BN]: yup
    .string()
    .required('পার্টির নাম বাংলায় প্রয়োজন'),
  [POLITICAL_PARTY.PARTY_NAME_EN]: yup
    .string()
    .required('পার্টির নাম ইংরেজিতে প্রয়োজন'),
  [POLITICAL_PARTY.ADDRESS]: yup.string().required('ঠিকানা প্রয়োজন'),
  [POLITICAL_PARTY.SYMBOL]: yup.string().required('প্রতীক প্রয়োজন'),
  [POLITICAL_PARTY.IS_ACTIVE]: yup.string(),
});

export type PoliticalPartyDataType = yup.InferType<
  typeof politicalPartyValidation
>;
