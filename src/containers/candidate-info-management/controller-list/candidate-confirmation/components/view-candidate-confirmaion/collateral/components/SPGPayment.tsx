import { useTranslation } from 'react-i18next';
import { Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';

const SPG_PAYMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.COLLATERAL.SPG_PAYMENT;

export const SPGPayment = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header
        headerText={{
          header: t('COLLATERAL.HEADER.SONALI_PAYMENT'),
        }}
      />
      <FormInput
        title="COLLATERAL.BANK_TRAN_ID"
        registerName={`.${SPG_PAYMENT.TRAN_ID}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.COMMISSION"
        registerName={`.${SPG_PAYMENT.COMMISSION}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.TOTAL_AMOUNT"
        registerName={`.${SPG_PAYMENT.TOTAL_AMOUNT}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.STATUS"
        registerName={`.${SPG_PAYMENT.STATUS}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.TRAN_DATE"
        registerName={`.${SPG_PAYMENT.TRAN_DATE}`}
        placeholder=" "
        disabled
      />
    </>
  );
};
