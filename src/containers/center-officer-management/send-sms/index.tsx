import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, ConfirmationModal, Header, Text } from '@pentabd/ui';
import { sendSMSBreadcrumbs } from './constants';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { IconChevronDown } from '@pentabd/icons';
import FormTextArea from '@components/inputs/FormTextArea';
import {
  CenterOfficerSendSMSDataType,
  centerOfficerSendSMSValidation,
} from '@validations/center-officer-management/send-sms/center-officer-send-sms-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetParticipantCount } from '@hooks/center-officer-management/send-sms/useGetParticipantCount';
import { getDigitBanglaFromEnglish } from '@utils';
import { useSendBulkSMS } from '@hooks/center-officer-management/send-sms/useSendBulkSMS';
import useFormSendSMS from '@hooks/center-officer-management/send-sms/useFormSendSMS';

const SEND_SMS = FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.SEND_SMS;

const USER_TYPE_CODE = 1011;

const CenterOfficerSendSMS = () => {
  const { t } = useTranslation();
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

  const methods = useForm<CenterOfficerSendSMSDataType>({
    resolver: yupResolver(centerOfficerSendSMSValidation),
  });

  const { handleSubmit, watch } = methods;

  const electionTypeWatch = watch(SEND_SMS.ELECTION_TYPE);
  const scheduleWatch = watch(SEND_SMS.ELECTION_SCHEDULE);
  const smsTextWatch = watch(SEND_SMS.SMS_TEXT);

  const { electionTypesCore, electionSchedules } = useFormSendSMS({
    electionTypeWatch,
  });

  const {
    count,
    getParticipantCount,
    loading: loadingCount,
    success: successCount,
  } = useGetParticipantCount();

  const {
    sendBulkSMS,
    loading: loadingBulkSMS,
    success: successBulkSMS,
  } = useSendBulkSMS();

  useEffect(() => {
    if (successCount) {
      setIsOpenConfirmationModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successCount]);

  useEffect(() => {
    if (successBulkSMS) {
      setIsOpenConfirmationModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successBulkSMS]);

  const onSubmit = (data: any) => {
    const electionScheduleId = Number(scheduleWatch);
    if (scheduleWatch) {
      getParticipantCount({
        electionScheduleId,
        userTypeCode: USER_TYPE_CODE,
      });
    }
  };

  const onCloseConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  const onConfirmSendSMS = () => {
    const electionScheduleId = Number(scheduleWatch);

    if (electionScheduleId && smsTextWatch?.length) {
      sendBulkSMS({
        electionScheduleId,
        userTypeCode: USER_TYPE_CODE,
        textValue: smsTextWatch,
      });
    }
  };

  return (
    <div className="container-96 mb-24 my-10">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('CENTER_OFFICER_SEND_SMS.SEND_SMS') }}
        breadcrumbs={sendSMSBreadcrumbs(t)}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column gap-8 p-10 border rounded-8 ">
            {/* নির্বাচনের ধরণ */}
            <FormSelect
              title={'CENTER_OFFICER_SEND_SMS.ELECTION_TYPE'}
              name={SEND_SMS.ELECTION_TYPE}
              options={electionTypesCore}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              required
              isSearchable
            />

            {/* নির্বাচনের নাম */}
            <FormSelect
              title={'CENTER_OFFICER_SEND_SMS.SCHEDULE_NAME'}
              name={SEND_SMS.ELECTION_SCHEDULE}
              options={electionSchedules}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              required
              isSearchable
            />

            {/* মুঠোফোন বার্তা */}
            <FormTextArea
              title={'CENTER_OFFICER_SEND_SMS.SMS_FIELD'}
              registerName={SEND_SMS.SMS_TEXT}
              placeholder={t('PLACEHOLDER.ENTER')}
              required
            />
          </div>

          <div className="d-flex flex-row justify-content-end border-top mt-10 pt-10">
            {/* send sms btn */}
            <Button
              key={2}
              htmlType="submit"
              type="info"
              loading={loadingCount}
            >
              <Text size="md" weight="semibold">
                {t('CENTER_OFFICER_SEND_SMS.SEND_SMS')}
              </Text>
            </Button>
          </div>
        </form>
      </FormProvider>

      <ConfirmationModal
        title={t('CENTER_OFFICER_SEND_SMS.CONFIRMATION_MODAL_TITLE')}
        subTitle={t('CENTER_OFFICER_SEND_SMS.CONFIRMATION_MODAL_SUB_TITLE', {
          dynamicValue: getDigitBanglaFromEnglish(count),
        })}
        isOpen={isOpenConfirmationModal}
        onClose={onCloseConfirmationModal}
        cancelButton={{
          onClick: onCloseConfirmationModal,
          label: t('CENTER_OFFICER_SEND_SMS.GO_BACK'),
          fill: 'outline',
          type: 'danger',
        }}
        confirmButton={{
          onClick: onConfirmSendSMS,
          label: t('CENTER_OFFICER_SEND_SMS.SEND_SMS_CONFIRM'),
          fill: 'fill',
          type: 'info',
          loading: loadingBulkSMS,
        }}
      />
    </div>
  );
};

export default CenterOfficerSendSMS;
