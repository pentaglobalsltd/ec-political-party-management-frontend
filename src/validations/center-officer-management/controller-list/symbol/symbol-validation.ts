import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';
import { imageRequiredValidation } from '@utils/file';

const CREATE_SYMBOL =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.SYMBOL.CREATE_SYMBOL;

export const createSymbolValidation = yup.object().shape({
  [CREATE_SYMBOL.SYMBOL_NAME_BN]: yup
    .string()
    .required('SYMBOL.SYMBOL_TYPE_ERROR_MSG.SYMBOL_TYPE_BN'),
  [CREATE_SYMBOL.SYMBOL_NAME_EN]: yup
    .string()
    .required('SYMBOL.SYMBOL_TYPE_ERROR_MSG.SYMBOL_TYPE_EN'),
  // [CREATE_SYMBOL.ELECTION_TYPE]: yup.string().required(),
  [CREATE_SYMBOL.CANDIDATE_TYPE]: yup
    .array()
    .of(yup.string())
    .required('SYMBOL.SYMBOL_TYPE_ERROR_MSG.SYMBOL_TYPE_CANDIDATE_TYPE'),
  // [CREATE_SYMBOL.SYMBOL_IMAGE]: yup
  //   .mixed()
  //   // .string()
  //   .required('SYMBOL.SYMBOL_TYPE_ERROR_MSG.SYMBOL_TYPE_SYMBOL_IMAGE'),
  [CREATE_SYMBOL.SYMBOL_IMAGE]: imageRequiredValidation(),
});

export type CreateSymbolDataType = yup.InferType<typeof createSymbolValidation>;
