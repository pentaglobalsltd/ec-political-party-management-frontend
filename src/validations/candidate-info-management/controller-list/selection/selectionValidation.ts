import { FORM_FIELDS } from '@constants/forms';
import * as yup from 'yup';

const SELECTION_TABLE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.SELECTION.TABLE;

// export const SELECTION_VALIDATION_KEY: string = 'selectionValidation';

export const selectionValidation = yup.object().shape({
  [SELECTION_TABLE.INFO]: yup.string().required('তথ্য আবশ্যক'),
  [SELECTION_TABLE.REASON]: yup.string().required('গ্রহণ/বাতিলের কারন আবশ্যক'),
});

export const selectionValidationSchema = yup.object().shape({
  selectionValidation: yup.array().of(selectionValidation),
});

export interface SelectionValidationDataType {
  selectionValidation: yup.InferType<typeof selectionValidation>[];
}
