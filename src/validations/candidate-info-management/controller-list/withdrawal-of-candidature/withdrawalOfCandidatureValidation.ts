import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const { WITHDRAWAL_TABLE } =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDACY_WITHDRAWAL;

export const candidacyWithdrawalValidation = yup.object().shape({
  [WITHDRAWAL_TABLE.DETAILS]: yup.string().required('বিস্তারিত বিবরণী আবশ্যক'),

  [WITHDRAWAL_TABLE.ATTACHMENT]: yup
    .object()
    .test('file', 'ফাইল আবশ্যক', function (value) {
      if (Object.keys(value).length !== 0) {
        return true;
      } else {
        return false;
      }
    }),
});

export const candidacyWithdrawalValidationSchema = yup.object().shape({
  candidacyWithdrawalValidation: yup.array().of(candidacyWithdrawalValidation),
});

export interface CandidacyWithdrawalValidationDataType {
  candidacyWithdrawalValidation: yup.InferType<
    typeof candidacyWithdrawalValidation
  >[];
}
