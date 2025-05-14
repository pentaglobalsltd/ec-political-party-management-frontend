import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import { Header } from '@pentabd/ui';

import FileComponent from '@components/inputs/FileComponent';
import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';

const MANUAL_PAYMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.COLLATERAL.MANUAL_PAYMENT;

export const ManualPayment = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  return (
    <>
      <Header
        headerText={{
          header: t('COLLATERAL.HEADER.MANUAL_PAYMENT'),
        }}
      />
      <FormInput
        title="COLLATERAL.CHALAN_NO"
        registerName={`.${MANUAL_PAYMENT.CHALAN_NO}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.CHALAN_DATE"
        registerName={`.${MANUAL_PAYMENT.CHALAN_DATE}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.DEPOSIT_TYPE"
        registerName={`.${MANUAL_PAYMENT.DEPOSIT_TYPE}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.REGION"
        registerName={`.${MANUAL_PAYMENT.REGION}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.BANK"
        registerName={`.${MANUAL_PAYMENT.BANK}`}
        placeholder=" "
        disabled
      />
      <FormInput
        title="COLLATERAL.BRANCH_NAME"
        registerName={`.${MANUAL_PAYMENT.BRANCH_NAME}`}
        placeholder=" "
        disabled
      />
      <FileComponent
        title={t('COLLATERAL.FILE')}
        registerName={MANUAL_PAYMENT.FILE}
        maxFileSize={25}
        downloadData={watch(MANUAL_PAYMENT.FILE)}
        disabledOption
      />
    </>
  );
};
