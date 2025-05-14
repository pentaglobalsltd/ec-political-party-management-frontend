import { useTranslation } from 'react-i18next';
import { Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';

const A_CHALAN_PAYMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.COLLATERAL.A_CHALAN_PAYMENT;

export const AChalanPayment = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header
        headerText={{
          header: t('COLLATERAL.HEADER.A_CHALAN_PAYMENT'),
        }}
      />
      <FormInput
        title="COLLATERAL.CHALAN_NO"
        registerName={`.${A_CHALAN_PAYMENT.CHALAN_NO}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.PAYMENT_ID"
        registerName={`.${A_CHALAN_PAYMENT.PAYMENT_ID}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.TOTAL_AMOUNT"
        registerName={`.${A_CHALAN_PAYMENT.PAID_AMOUNT}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.STATUS"
        registerName={`.${A_CHALAN_PAYMENT.STATUS}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.TRAN_DATE"
        registerName={`.${A_CHALAN_PAYMENT.PAYMENT_DATE}`}
        placeholder=" "
        disabled
      />
    </>
  );
};
