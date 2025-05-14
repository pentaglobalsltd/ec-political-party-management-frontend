import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';

const ALLOCATION_TABLE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.SYMBOL_ALLOCATION
    .ALLOCATION_TABLE;

export const symbolAllocationValidation = yup.object().shape({
  [ALLOCATION_TABLE.ALLOCATED_SYMBOL]: yup
    .string()
    .required('বরাদ্দকৃত প্রতীক আবশ্যক'),
  [ALLOCATION_TABLE.CANDIDATE_NAME_SERIAL]: yup
    .string()
    .required('প্রার্থীর নামের ক্রম আবশ্যক')
    .matches(CHECK_ONLY_NUMBER_AND_EMPTY, 'সংখ্যা হওয়া আবশ্যক '),
});

export const symbolValidationSchema = yup.object().shape({
  symbolAllocationValidation: yup.array().of(symbolAllocationValidation),
});

export interface SymbolAllocationValidationDataType {
  symbolAllocationValidation: yup.InferType<
    typeof symbolAllocationValidation
  >[];
}
