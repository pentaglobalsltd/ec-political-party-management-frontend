import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';

import { useSendCredential } from '@hooks/candidate-info-management/controller-list/candidate-management-dashboard/useSendCredential';
import { FORM_FIELDS } from '@constants/forms';

const SEND_SMS_MODAL =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .SEND_SMS_MODAL;

const SendSmsModal = ({ rowData }: any) => {
  const { candidateElectionDetailsId, nid10Digit } = rowData;
  const { t } = useTranslation();

  const { getSendCredential, loading } = useSendCredential();

  const methods = useForm<any>({
    values: {
      [SEND_SMS_MODAL.USER_ID]: nid10Digit,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    getSendCredential({
      candidateElectionDetailsId,
      newPassword: data?.newPassword,
    });
  };

  return (
    <div className="pt-20 px-12 pb-12 ">
      <Text className="my-4 me-6" size="xl" weight="semibold">
        {t('CANDIDATE_MANAGEMENT.SEND_SMS_MODAL_HEADER')}
      </Text>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-16">
            <FormInput
              title="CANDIDATE_MANAGEMENT.USER_ID"
              registerName={SEND_SMS_MODAL.USER_ID}
              placeholder=" "
              disabled
            />
            <FormInput
              title="CANDIDATE_MANAGEMENT.NEW_PASSWORD"
              registerName={SEND_SMS_MODAL.NEW_PASSWORD}
              placeholder="PLACEHOLDER.ENTER"
            />
            <div className="d-flex justify-content-end">
              <Button
                size="md"
                type="info"
                className="border ms-3 px-6"
                htmlType="submit"
                loading={loading}
              >
                {t('CANDIDATE_MANAGEMENT.SEND_SMS_BUTTON')}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SendSmsModal;
