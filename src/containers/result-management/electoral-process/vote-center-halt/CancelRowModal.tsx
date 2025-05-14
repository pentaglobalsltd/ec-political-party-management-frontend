import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Text } from '@pentabd/ui';

import { FORM_FIELDS } from '@constants/forms';
import useUpdatePollingCentersById from '@hooks/vote-center-management/center-management/polling-center/useUpdatePollingCenterById';
import FormTextArea from '@components/inputs/FormTextArea';

const VOTE_CENTER_HALT = FORM_FIELDS.RESULT_MANAGEMENT.VOTE_CENTER_HALT;

const CancelRowModal = ({
  closeCancelModal,
  rowData,
  handleHaltSuccess,
}: any) => {
  const { t } = useTranslation();
  const { updateUpdatePollingCentersByIdData, loading, success } =
    useUpdatePollingCentersById();

  const id = rowData?.id;
  const isActive = rowData?.isActive;

  const methods = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    const submitData = {
      id,
      isActive: !isActive,
      statusComments: data?.[VOTE_CENTER_HALT.COMMENT],
    };

    updateUpdatePollingCentersByIdData({
      id,
      data: submitData,
    });
  };

  useEffect(() => {
    if (success) {
      handleHaltSuccess(true);
      closeCancelModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <FormProvider {...methods}>
      <form className="p-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column py-9">
          <Text className="mb-6" weight="semibold" size="md">
            {isActive
              ? t('VOTE_CENTER_HALT.MODAL_HEADER')
              : t('VOTE_CENTER_HALT.MODAL_HEADER_ACTIVE')}
          </Text>
          <Text className="mb-2">{t('VOTE_CENTER_HALT.MODAL_COMMENT')}</Text>

          {/* Comment - textArea */}
          <FormTextArea
            colTwoClassName="col-span-lg-12"
            registerName={VOTE_CENTER_HALT.COMMENT}
          />
        </div>
        <div className="d-flex flex-row-reverse gap-6">
          <Button
            size="xs"
            key={3}
            htmlType="submit"
            type={isActive ? 'danger' : 'success'}
            loading={loading}
          >
            {isActive
              ? t('VOTE_CENTER_HALT.MODAL_SUBMIT_BUTTON')
              : t('VOTE_CENTER_HALT.ACTIVE_BUTTON')}
          </Button>
          <Button
            size="xs"
            key={4}
            type="secondary"
            className="bg-purple text-white"
            onClick={closeCancelModal}
            loading={loading}
          >
            {t('VOTE_CENTER_HALT.MODAL_RETURN_BUTTON')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CancelRowModal;
