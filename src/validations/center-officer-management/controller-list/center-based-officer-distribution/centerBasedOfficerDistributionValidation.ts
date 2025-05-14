import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const PRESIDING_OFFICER_CODE = '1011';

const CENTER_BASED_OFFICER_ALLOCATION =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST
    .CENTER_BASED_OFFICER_ALLOCATION;

export const centerBasedofficerAllocationValidation = yup.object().shape({
  [CENTER_BASED_OFFICER_ALLOCATION.DESIGNATION]: yup
    .string()
    .required('Designation is required'),
  [CENTER_BASED_OFFICER_ALLOCATION.BOOTH]: yup
    .string()
    .when([CENTER_BASED_OFFICER_ALLOCATION.DESIGNATION], {
      is: PRESIDING_OFFICER_CODE,
      then: (schema) => schema,
      otherwise: (schema) => schema.required('Booth is required'),
    }),

  [CENTER_BASED_OFFICER_ALLOCATION.IS_ACTIVE_PRESIDING_OFFICER]: yup.boolean(),
});

export type CenterBasedOfficerAllocationType = yup.InferType<
  typeof centerBasedofficerAllocationValidation
>;
