import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { SelectMultiselectValidation } from '@validations/utils';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';

const MUNICIPALITY =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.MUNICIPALITY
    .CREATE_MUNICIPALITY;

export const municipalityValidation = yup.object().shape({
  [MUNICIPALITY.DISTRICT]: yup
    .string()
    .required('MUNICIPALITY_ERROR_MSG.DISTRICT'),
  [MUNICIPALITY.MUNICIPALITY_BN]: yup
    .string()
    .required('MUNICIPALITY_ERROR_MSG.MUNICIPALITY_BN'),
  [MUNICIPALITY.MUNICIPALITY_EN]: yup
    .string()
    .required('MUNICIPALITY_ERROR_MSG.MUNICIPALITY_EN'),
  [MUNICIPALITY.SUB_DISTRICT]: SelectMultiselectValidation(
    'MUNICIPALITY_ERROR_MSG.SUB_DISTRICT',
  ),
  [MUNICIPALITY.MUNICIPALITY_GO_CODE]: yup
    .string()
    .required('DIVISION_VALIDATION_ERROR_MSG.DIVISION_GO_CODE')
    .matches(
      CHECK_ONLY_NUMBER,
      'MUNICIPALITY_ERROR_MSG.MUNICIPALITY_GEO_CODE_POSITIVE',
    ),
  [MUNICIPALITY.RMO]: yup.string().required('MUNICIPALITY_ERROR_MSG.RMO'),
});

export type MunicipalityDataType = yup.InferType<typeof municipalityValidation>;
