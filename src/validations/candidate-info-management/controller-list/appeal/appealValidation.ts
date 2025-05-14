import { FORM_FIELDS } from '@constants/forms';
import * as yup from 'yup';

const APPEAL_TABLE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.APPEAL.APPEAL_TABLE;

export const appealValidation = yup.object().shape({
  [APPEAL_TABLE.APPEAL_TYPE]: yup.string().required('আপিলের প্রকার আবশ্যক'),
  [APPEAL_TABLE.DETAILS]: yup.string().required('বিস্তারিত বিবরণী আবশ্যক'),
  [APPEAL_TABLE.FILE]: yup
    .object()
    .test('file', 'সংযুক্তি আবশ্যক', function (value) {
      if (Object.keys(value).length !== 0) {
        return true;
      } else {
        return false;
      }
    }),
});

export const appealValidationSchema = yup.object().shape({
  appealValidation: yup.array().of(appealValidation),
});

export interface AppealValidationDataType {
  appealValidation: yup.InferType<typeof appealValidation>[];
}
