import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { IconCalendar } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormDate from '@components/inputs/FormDate';
import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import FileComponent from '@components/inputs/FileComponent';

import { FORM_FIELDS } from '@constants/forms';
import { FILE_CATEGORY } from '@constants/file';
import { useBanks } from '@hooks/miscellaneous/master-hook/bank/useBanks';
import { useRegions } from '@hooks/miscellaneous/master-hook/region/useRegions';

const MANUAL_PAYMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.COLLATERAL.MANUAL_PAYMENT;

export const EditManualPayment = ({
  isUpdateRequested,
  electionScheduleId,
}: {
  isUpdateRequested?: boolean;
  electionScheduleId?: string;
}) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const { banks } = useBanks();
  const { regions } = useRegions();

  return (
    <>
      <Header
        headerText={{
          header: t('COLLATERAL.HEADER.MANUAL_PAYMENT'),
        }}
      />

      <FormDate
        name="COLLATERAL.CHALAN_DATE"
        title="COLLATERAL.CHALAN_DATE"
        registerName={MANUAL_PAYMENT.CHALAN_DATE}
        prefix={<IconCalendar size="20" fill="subtitle2" />}
        maximumDate={dayjs()}
        placeholder="PLACEHOLDER.SELECT"
        required
      />
      <FormInput
        title="COLLATERAL.CHALAN_NO"
        registerName={MANUAL_PAYMENT.CHALAN_NO}
        placeholder="PLACEHOLDER.ENTER"
        required
      />
      <FormSelect
        title="COLLATERAL.TYPE_OF_DEPOSIT"
        name={MANUAL_PAYMENT.DEPOSIT_TYPE}
        options={[
          {
            label: t('COLLATERAL.CASH'),
            value: 'cash',
          },
        ]}
        placeholder="PLACEHOLDER.SELECT"
        disabled
        required
      />
      <FormSelect
        title="COLLATERAL.BANK"
        name={MANUAL_PAYMENT.BANK_ID}
        options={banks}
        placeholder="PLACEHOLDER.SELECT"
        required
      />
      <FormSelect
        title="COLLATERAL.REGION"
        name={MANUAL_PAYMENT.REGION_ID}
        options={regions}
        placeholder="PLACEHOLDER.SELECT"
        required
      />
      <FormInput
        title="COLLATERAL.BRANCH"
        registerName={MANUAL_PAYMENT.BRANCH_NAME}
        placeholder="PLACEHOLDER.ENTER"
        required
      />
      <FileComponent
        title={t('COLLATERAL.ATTACHMENT_OF_INVOICE')}
        registerName={MANUAL_PAYMENT.FILE}
        downloadData={watch(MANUAL_PAYMENT.FILE)}
        category={FILE_CATEGORY.CANDIDATES}
        pathId={electionScheduleId}
        maxFileSize={25}
        required
      />

      <div className="row border-top py-8">
        <div className="col-12 d-flex justify-content-end gap-6">
          <Button
            fill="fill"
            type="primary"
            htmlType="submit"
            loading={isUpdateRequested}
          >
            {t('COLLATERAL.SAVE_NEXT_BUTTON')}
          </Button>
        </div>
      </div>
    </>
  );
};
