import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { fileRequiredValidation } from '@utils/file';

const ACKNOWLEDGEMENT_RECEIPT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_APPLIED_ONLINE
    .ACKNOWLEDGEMENT_RECEIPT;

const NOMINATION_ACCEPTANCE_DECISION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_APPLIED_ONLINE
    .NOMINATION_ACCEPTANCE_DECISION;

export const acknowledgementReceiptValidation = yup.object().shape({
  [ACKNOWLEDGEMENT_RECEIPT.SERIAL_NUMBER]: yup
    .string()
    .required('প্রার্থী সিরিয়াল নম্বর আবশ্যক'),
  [ACKNOWLEDGEMENT_RECEIPT.REMARK]: yup.string().required('মন্তব্য আবশ্যক'),
  [ACKNOWLEDGEMENT_RECEIPT.UPLOAD_DOCUMENT]: fileRequiredValidation(),
});

export const nominationAcceptanceValidation = yup.object().shape({
  [NOMINATION_ACCEPTANCE_DECISION.ACCEPT_NOMINATION_LETTER]: yup
    .string()
    .required('সিদ্ধান্ত আবশ্যক'),
  [NOMINATION_ACCEPTANCE_DECISION.REMARK]: yup
    .string()
    .required('মন্তব্য দরকার'),
  [NOMINATION_ACCEPTANCE_DECISION.UPLOAD_DOCUMENT]: fileRequiredValidation(),
});

export type AcknowledgementReceiptDataType = yup.InferType<
  typeof acknowledgementReceiptValidation
>;

export type NominationAcceptanceDataType = yup.InferType<
  typeof nominationAcceptanceValidation
>;
