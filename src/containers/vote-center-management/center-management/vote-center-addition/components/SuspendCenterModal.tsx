import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Text } from '@pentabd/ui';
import { IconCheckCircleBroken } from '@pentabd/icons';

import { FORM_FIELDS } from '@constants/forms';
import FormTextArea from '@components/inputs/FormTextArea';

import useUpdatePollingCentersById from '@hooks/vote-center-management/center-management/polling-center/useUpdatePollingCenterById';

const CANCEL_MODAL_COMMENT =
  FORM_FIELDS.VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION
    .CANCEL_MODAL_COMMENT;

const SuspendCenterModal = ({
  row,
  closeCancelModal,
  getPollingCenterAggregatedData,
  searchItems,
}: any) => {
  const { t } = useTranslation();
  const id = row?.id;
  const isActive = row?.isActive;

  const { updateUpdatePollingCentersByIdData, loading, success } =
    useUpdatePollingCentersById();

  const methods = useForm();
  const { handleSubmit } = methods;

  const handleCloseModal = () => {
    closeCancelModal();
  };

  const onSubmit = (data: any) => {
    const submitData = {
      id,
      isActive: !isActive,
      statusComments: data?.statusComments,
    };

    updateUpdatePollingCentersByIdData({
      id,
      data: submitData,
    });
  };

  useEffect(() => {
    if (success) {
      getPollingCenterAggregatedData(searchItems); // TODO
      closeCancelModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="p-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column gap-2">
            <Text
              className="mb-8 pb-6 border-bottom"
              weight="semibold"
              size="lg"
            >
              {`${t('CENTER_BASED_OFFICER_ALLOCATION.CANCEL_MODAL_TITLE')} `}
            </Text>

            {/* Comment - text */}
            <Text weight="semibold" size="sm" color="title">
              {`${t('CENTER_BASED_OFFICER_ALLOCATION.CANCEL_MODAL_COMMENT')} `}
            </Text>

            {/* Comment - textArea */}
            <FormTextArea
              // colOneClassName="col-span-lg-3"
              colTwoClassName="col-span-lg-12"
              // title="CENTER_BASED_OFFICER_ALLOCATION.CANCEL_MODAL_COMMENT"
              registerName={CANCEL_MODAL_COMMENT}
            />

            <div className="d-flex flex-row-reverse gap-6">
              <Button
                size="xs"
                key={1}
                htmlType="submit"
                type="primary"
                loading={loading}
              >
                {t('SUBMIT_RESULTS.MODAL_SUBMIT_BUTTON')}
                <IconCheckCircleBroken size="20" fill="white" />
              </Button>
              <Button
                size="xs"
                key={2}
                fill="outline"
                type="secondary"
                onClick={handleCloseModal}
              >
                {t('SUBMIT_RESULTS.MODAL_RETURN_BUTTON')}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SuspendCenterModal;
