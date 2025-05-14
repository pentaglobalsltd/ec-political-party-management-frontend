import * as yup from 'yup';

import { FORM_FIELDS } from '@constants/forms';

export const MANUAL_PAYMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.COLLATERAL.MANUAL_PAYMENT;

export const collateralValidation = yup.object().shape({
  [MANUAL_PAYMENT.CHALAN_DATE]: yup
    .string()
    .required('COLLATERAL.CHALAN_DATE_ERROR_MSG'),
  [MANUAL_PAYMENT.CHALAN_NO]: yup
    .string()
    .required('COLLATERAL.CHALAN_NO_ERROR_MSG'),
  [MANUAL_PAYMENT.DEPOSIT_TYPE]: yup
    .string()
    .required('COLLATERAL.DEPOSIT_TYPE_ERROR_MSG'),
  [MANUAL_PAYMENT.BANK_ID]: yup.string().required('COLLATERAL.BANK_ERROR_MSG'),
  [MANUAL_PAYMENT.REGION_ID]: yup
    .string()
    .required('COLLATERAL.REGION_ERROR_MSG'),
  [MANUAL_PAYMENT.BRANCH_NAME]: yup
    .string()
    .required('COLLATERAL.BRANCH_ERROR_MSG'),
  [MANUAL_PAYMENT.FILE]: yup
    .mixed()
    .nullable()
    .test('is-not-null', 'COLLATERAL.FILE_ERROR_MSG', (value) => value !== null)
    .test('Required', 'COLLATERAL.FILE_ERROR_MSG', function (value) {
      if (value && Object.keys(value).length !== 0) {
        const isNull = !Object.values(value).some((item) => item === null);
        return isNull;
      } else {
        return false;
      }
    }),
});

export type collateralFormData = yup.InferType<typeof collateralValidation>;
