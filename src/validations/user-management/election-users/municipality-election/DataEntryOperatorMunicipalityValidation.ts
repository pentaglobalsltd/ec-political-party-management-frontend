import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { SelectMultiselectValidation } from '@validations/utils';

const DATA_ENTRY_OPERATOR =
  FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER.DATA_ENTRY_OPERATOR;

export const dataEntryOperatorMunicipalityValidation = yup.object().shape({
  [DATA_ENTRY_OPERATOR.TYPE_OF_ELECTION]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.DATA_ENTRY_OP_TYPE_OF_ELECTION'),
  [DATA_ENTRY_OPERATOR.ELECTION_NAME]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.DATA_ENTRY_OP_ELECTION_NAME'),
  [DATA_ENTRY_OPERATOR.DISTRICT]: yup
    .string()
    .required('CREATE_NEW_USER_ERROR_MSG.DATA_ENTRY_OP_DISTRICT'),
  [DATA_ENTRY_OPERATOR.MUNICIPALITY]: SelectMultiselectValidation(
    'CREATE_NEW_USER_ERROR_MSG.DATA_ENTRY_OP_MUNICIPALITY_ONLY',
  ),
});

export type DataEntryOperatorMunicipalityValidationDataType = yup.InferType<
  typeof dataEntryOperatorMunicipalityValidation
>;
