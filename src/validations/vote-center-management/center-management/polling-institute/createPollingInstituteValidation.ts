import * as yup from 'yup';

import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import { RMO } from '@constants/rmo';

export const CREATE_POLLING_INSTITUTE =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.POLLING_INSTITUTE
    .CREATE_POLLING_INSTITUTE;

export const createPollingInstituteValidation = yup.object().shape({
  [CREATE_POLLING_INSTITUTE.DIVISION]: yup
    .string()
    .required('POLLING_INSTITUTE_ERROR_MSG.DIVISION_ERROR_MSG'),
  [CREATE_POLLING_INSTITUTE.ZILA]: yup
    .string()
    .required('POLLING_INSTITUTE_ERROR_MSG.ZILA_ERROR_MSG'),
  [CREATE_POLLING_INSTITUTE.UPAZILA]: yup
    .string()
    .required('POLLING_INSTITUTE_ERROR_MSG.UPAZILA_ERROR_MSG'),

  [CREATE_POLLING_INSTITUTE.RMO]: yup
    .string()
    .required('POLLING_INSTITUTE_ERROR_MSG.RMO_ERROR_MSG'),

  [CREATE_POLLING_INSTITUTE.MUNICIPALITY_CITY_CORPORATION]: yup
    .string()
    .nullable(),
  [CREATE_POLLING_INSTITUTE.UNION_WARD]: yup
    .number()
    .typeError('POLLING_INSTITUTE_ERROR_MSG.UNION_WARD_TYPE_ERROR_MSG')
    .required('POLLING_INSTITUTE_ERROR_MSG.UNION_WARD_ERROR_MSG'),

  [CREATE_POLLING_INSTITUTE.UP_WARD]: yup
    .string()
    .when([CREATE_POLLING_INSTITUTE.RMO], (data, schema) => {
      if (data?.[0] === RMO.RURAL) {
        return schema
          .typeError('POLLING_INSTITUTE_ERROR_MSG.UP_WARD_TYPE_ERROR_MSG')
          .required('POLLING_INSTITUTE_ERROR_MSG.UP_WARD_ERROR_MSG');
      }

      return schema.nullable();
    }),

  [CREATE_POLLING_INSTITUTE.INSTITUTE_NAME_BANGLA]: yup
    .string()
    .required('POLLING_INSTITUTE_ERROR_MSG.INSTITUTE_NAME_BN_ERROR_MSG'),

  // 8
  [CREATE_POLLING_INSTITUTE.INSTITUTE_NAME_ENGLISH]: yup
    .string()
    .nullable()
    .required('POLLING_INSTITUTE_ERROR_MSG.INSTITUTE_NAME_EN_ERROR_MSG'),

  // 9
  [CREATE_POLLING_INSTITUTE.INSTITUTE_ADDRESS_BANGLA]: yup.string().nullable(),

  // 10
  [CREATE_POLLING_INSTITUTE.INSTITUTE_ADDRESS_ENGLISH]: yup.string().nullable(),
  [CREATE_POLLING_INSTITUTE.INSTITUTE_TYPE]: yup
    .string()
    .required('POLLING_INSTITUTE_ERROR_MSG.INSTITUTE_TYPE_ERROR_MSG'),
  [CREATE_POLLING_INSTITUTE.HEAD_NAME_DESIGNATION]: yup.string().nullable(),
  // .required('POLLING_INSTITUTE_ERROR_MSG.HEAD_NAME_DESIGNATION_ERROR_MSG'),
  [CREATE_POLLING_INSTITUTE.HEAD_CONTACT_NO]: yup.string().nullable(),
  [CREATE_POLLING_INSTITUTE.INSTITUTE_EMPLOYEE_AMOUNT]: yup.string().nullable(),
  [CREATE_POLLING_INSTITUTE.BUILDING_TYPE]: yup
    .string()
    .required('POLLING_INSTITUTE_ERROR_MSG.BUILDING_TYPE_ERROR_MSG'),
  [CREATE_POLLING_INSTITUTE.BUILDING_FLOORS]: yup.string().nullable(),
  [CREATE_POLLING_INSTITUTE.TOTAL_ROOM_AMOUNT]: yup.string().nullable(),
  [CREATE_POLLING_INSTITUTE.IS_INSTITUTE_ELECTRICITY_SUPPLY]: yup
    .boolean()
    .nullable(),
  [CREATE_POLLING_INSTITUTE.IS_INSTITUTE_DRINKING_WATER]: yup
    .boolean()
    .nullable(),
  [CREATE_POLLING_INSTITUTE.INSTITUTE_TOILET]: yup.boolean().nullable(),
  [CREATE_POLLING_INSTITUTE.IS_BOUNDARY_RAILED]: yup.boolean().nullable(),
  [CREATE_POLLING_INSTITUTE.DESCRIPTION_OF_BLOCK]: yup.string().nullable(),
  [CREATE_POLLING_INSTITUTE.INSTITUTE_DISTANCE]: yup.string().nullable(),
  [CREATE_POLLING_INSTITUTE.INSTITUTE_REACHING_WAYS]: yup.string().nullable(),
  [CREATE_POLLING_INSTITUTE.IS_PAST_RISKY_IMPORTANT_INSTITUTE]: yup
    .boolean()
    .nullable(),
  [CREATE_POLLING_INSTITUTE.IS_DAYLIGHT_ENOUGH]: yup.boolean().nullable(),
  [CREATE_POLLING_INSTITUTE.IS_OPEN_SPACE]: yup.boolean().nullable(),
  [CREATE_POLLING_INSTITUTE.IS_FLOOD_PRONE_AREA]: yup.boolean().nullable(),
  [CREATE_POLLING_INSTITUTE.COMMENT]: yup.string().nullable(),
});

export type createPollingInstituteDataType = yup.InferType<
  typeof createPollingInstituteValidation
>;
