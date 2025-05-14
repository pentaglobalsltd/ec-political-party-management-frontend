import { useTranslation } from 'react-i18next';
import { Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';

const SSL_PAYMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.COLLATERAL.SSL_PAYMENT;

export const SSLPayment = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header
        headerText={{
          header: t('COLLATERAL.HEADER.SSL_PAYMENT'),
        }}
      />
      <FormInput
        title="COLLATERAL.BANK_TRAN_ID"
        registerName={`.${SSL_PAYMENT.BANK_TRAN_ID}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.SECURITY_MONEY"
        registerName={`.${SSL_PAYMENT.STORE_AMOUNT}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.TOTAL_AMOUNT"
        registerName={`.${SSL_PAYMENT.AMOUNT}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.STATUS"
        registerName={`.${SSL_PAYMENT.STATUS}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.TRAN_DATE"
        registerName={`.${SSL_PAYMENT.TRAN_DATE}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.CARD_NO"
        registerName={`.${SSL_PAYMENT.CARD_NO}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.CARD_TYPE"
        registerName={`.${SSL_PAYMENT.CARD_TYPE}`}
        placeholder=" "
        disabled
      />
    </>
  );
};
