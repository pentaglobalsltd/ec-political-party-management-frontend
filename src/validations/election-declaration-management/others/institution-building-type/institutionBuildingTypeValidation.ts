import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

export const INSTITUTE_BUILDING_TYPE =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.OTHERS.INSTITUTE_TYPE
    .CREATE_INSTITUTE_TYPE;

export const instituteBuildingTypeValidation = yup.object().shape({
  [INSTITUTE_BUILDING_TYPE.INSTITUTE_TYPE_BN]: yup
    .string()
    .required('INSTITUTE_BUILDING_TYPE_ERROR_MSG.BUILDING_CATEGORY_BN'),
  [INSTITUTE_BUILDING_TYPE.INSTITUTE_TYPE_EN]: yup
    .string()
    .required('INSTITUTE_BUILDING_TYPE_ERROR_MSG.BUILDING_CATEGORY_EN'),
});

export type InstituteBuildingTypeDataType = yup.InferType<
  typeof instituteBuildingTypeValidation
>;
