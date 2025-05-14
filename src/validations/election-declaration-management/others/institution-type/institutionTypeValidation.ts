import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const INSTITUTION_TYPE =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.OTHERS.INSTITUTION_BUILDING_TYPE;

export const institutionTypeValidation = yup.object().shape({
  [INSTITUTION_TYPE.BUILDING_CATEGORY_BN]: yup
    .string()
    .required('INSTITUTE_TYPE_ERROR_MSG.INSTITUTE_TYPE_BN'),
  [INSTITUTION_TYPE.BUILDING_CATEGORY_EN]: yup
    .string()
    .required('INSTITUTE_BUILDING_TYPE_ERROR_MSG.BUILDING_CATEGORY_EN'),
});

export type InstitutionTypeDataType = yup.InferType<
  typeof institutionTypeValidation
>;
