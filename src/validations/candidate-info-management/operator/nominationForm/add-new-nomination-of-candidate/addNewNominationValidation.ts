import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';

import {
  emailNotRequiredValidation,
  mobileNumberValidation,
  nidValidation,
} from '../../../../utils';

const PERSONAL =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.PERSONAL;
const NOMINATION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.NOMINATION;

export const nominationFormCommonValidation = yup.object().shape({
  [NOMINATION.TYPE]: yup.string().required('REGISTRATION_ERROR_MSG.TYPE'),
  [NOMINATION.NAME]: yup.string().required('REGISTRATION_ERROR_MSG.NAME'),
  [NOMINATION.POST]: yup.string().required('REGISTRATION_ERROR_MSG.POST'),
  [NOMINATION.DEPARTMENT]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.DEPARTMENT'),
  [NOMINATION.DISTRICT]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.DISTRICT'),
});

export const registrationFormValidation = yup.object().shape({
  [PERSONAL.BIRTH_DATE]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.BIRTH_DATE'),
  [PERSONAL.NID]: nidValidation,
  [PERSONAL.EMAIL]: emailNotRequiredValidation,
  [PERSONAL.MOBILE]: mobileNumberValidation,
});

export const nationalElectionValidation = yup.object().shape({
  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.CONSTITUENCY'),
});

export const cityMayorElectionValidation = yup.object().shape({
  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.MUNICIPALITY'),
});

export const cityCounselorElectionValidation = yup.object().shape({
  [NOMINATION.MUNICIPALITY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.MUNICIPALITY'),

  [NOMINATION.UPAZILLA]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UPAZILLA'),

  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UNION_WARD'),
});

export const cityReservedCounselorValidation = yup.object().shape({
  [NOMINATION.MUNICIPALITY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.MUNICIPALITY'),

  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UNION_WARD'),
});

export const upazillaElectionValidation = yup.object().shape({
  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UPAZILLA'),
});

export const municipalityMayorElectionValidation = yup.object().shape({
  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.MUNICIPALITY'),
});

export const municipalityCounselorElectionValidation = yup.object().shape({
  [NOMINATION.MUNICIPALITY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.MUNICIPALITY'),

  [NOMINATION.UPAZILLA]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UPAZILLA'),

  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UNION_WARD'),
});

export const municipalityReservedCounselorValidation = yup.object().shape({
  [NOMINATION.MUNICIPALITY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.MUNICIPALITY'),

  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UNION_WARD'),
});

export const unionChairmanValidation = yup.object().shape({
  [NOMINATION.UPAZILLA]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UPAZILLA'),

  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UNION'),
});
export const unionGeneralAndReservedValidation = yup.object().shape({
  [NOMINATION.UPAZILLA]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UPAZILLA'),
  [NOMINATION.UNION_WARD]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UNION_PARISHAD_WARD'),
  [NOMINATION.CONSTITUENCY]: yup
    .string()
    .required('REGISTRATION_ERROR_MSG.UNION_PARISHAD_RESERVED_WARD'),
});
