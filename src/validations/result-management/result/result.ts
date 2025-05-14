import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const RESULT_MANAGEMENT_COMMENT_BY_ARO =
  FORM_FIELDS.RESULT_MANAGEMENT_COMMENT_BY_ARO;

export const resultApproveByAROValidation = yup.object().shape({
  [RESULT_MANAGEMENT_COMMENT_BY_ARO.COMMENT]: yup.string().nullable(),
});

export type ResultApproveByARODataType = yup.InferType<
  typeof resultApproveByAROValidation
>;
