import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Note, Text } from '@pentabd/ui';
import { ModalProps } from '@pentabd/ui/build/atoms/modal/Modal';
import FileComponent from '@components/inputs/FileComponent';
import FormCheckbox from '@components/inputs/FormCheckbox';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  MessageSendListPublishValidationType,
  messageSendListPublishValidation,
} from '@validations/result-management/electoral-process/messageSendListPublishValidation';
import { FORM_FIELDS } from '@constants/forms';
import { useUpdateMessageSend } from '@hooks/result-management/electoral-process/message-sending-list/useUpdateMessageSend';

import { MESSAGE_SEND_STATUS } from '../../../../../../constants/polling-center-results';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import { useUpdateMessageSendFinal } from '@hooks/result-management/electoral-process/message-sending-list/useUpdateMessageSendFinal';
import { FILE_CATEGORY } from '@constants/file';

const MESSAGE_SEND_LIST_PUBLISH =
  FORM_FIELDS.RESULT_MANAGEMENT.MESSAGE_SEND_LIST_PUBLISH;

interface Props extends ModalProps {
  rowData: any;
  fromView: boolean;
  handleCloseModal: () => void;
  onSuccess?: () => void;
  scheduleId: string | number;
  portal?: boolean;
}

const PublishModal = ({
  isOpen,
  rowData,
  fromView,
  handleCloseModal,
  onSuccess,
  scheduleId,
  portal,
}: Props) => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showCheckBox, setShowCheckBox] = useState<boolean>(
    rowData?.totalCenterCount - rowData?.totalCancelledCenterCount ===
      rowData?.totalResultApprovedCenterCount,
  );

  const { updateMessageSend, isSuccess } = useUpdateMessageSend();
  const { updateMessageSendFinal, isSuccess: isSuccessFinal } =
    useUpdateMessageSendFinal();

  const methods = useForm<MessageSendListPublishValidationType>({
    resolver: yupResolver(messageSendListPublishValidation),
  });

  const { handleSubmit, watch, reset } = methods;

  const onSubmit = (data: any) => {
    let __data = data;
    let isFinal = false;

    // final
    if (
      fileRequired &&
      data?.finalFile &&
      data?.finalFile?.documentId &&
      permissionsArray?.includes(
        RESULT_MANAGEMENT.ELECTION_PROCESS_SUBMIT_FINAL_BARTA_SHEET,
      )
    ) {
      __data = {
        sheetStatus: MESSAGE_SEND_STATUS.FINAL,
        finalFile: data.finalFile,
      };
      isFinal = true;
    }

    // only publish
    else {
      __data = {
        sheetStatus: MESSAGE_SEND_STATUS.PUBLISHED,
      };
    }

    if (rowData.id && scheduleId) {
      if (isFinal) {
        updateMessageSendFinal({
          scheduleId: scheduleId,
          id: rowData.id,
          data: __data,
        });
      } else {
        updateMessageSend({
          scheduleId: scheduleId,
          id: rowData.id,
          data: __data,
        });
      }
    }
  };

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  const fileRequired = watch(MESSAGE_SEND_LIST_PUBLISH.CHECK) as boolean;

  useEffect(() => {
    if (rowData) {
      setShowCheckBox(
        rowData?.totalCenterCount - rowData?.totalCancelledCenterCount ===
          rowData?.totalResultApprovedCenterCount,
      );
    }
  }, [rowData]);

  useEffect(() => {
    if (isSuccess || isSuccessFinal) {
      handleCloseModal();
      reset();
      if (onSuccess) {
        onSuccess();
      }
      if (fromView) {
        navigate(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isSuccessFinal]);

  return (
    <Modal
      isOpen={isOpen}
      overlay
      closeAble
      portal={portal}
      onClose={handleCloseModal}
    >
      <FormProvider {...methods}>
        <form className="py-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-12">
            <Text size="lg" weight="semibold" component="h2" className="mb-10">
              {t('MESSAGE_SEND_LIST_PUBLISH.MODAL.TITLE')}
            </Text>

            <div className="p-12 ">
              {rowData?.generatedBy !== 'ARO' &&
                showCheckBox &&
                permissionsArray?.includes(
                  RESULT_MANAGEMENT.ELECTION_PROCESS_SUBMIT_FINAL_BARTA_SHEET,
                ) && (
                  <FormCheckbox
                    title="MESSAGE_SEND_LIST_PUBLISH.MODAL.FORM_CHECK.TITLE"
                    registerName={MESSAGE_SEND_LIST_PUBLISH.CHECK}
                  />
                )}
              {fileRequired && (
                <FileComponent
                  title={t('MESSAGE_SEND_LIST_PUBLISH.MODAL.FORM_FILE.TITLE')}
                  registerName={MESSAGE_SEND_LIST_PUBLISH.FINAL_FILE}
                  additionalText={t(
                    'MESSAGE_SEND_LIST_PUBLISH.UPLOAD_WARNINGS',
                  )}
                  handleButtonDisable={handleButtonDisable}
                  required
                  pathId={rowData?.electionScheduleId}
                  category={FILE_CATEGORY.RMS}
                />
              )}

              <div className="mb-9">
                <Note
                  body={
                    <Text
                      size="xl"
                      weight="semibold"
                      className="lh-sm text-warning"
                    >
                      {rowData?.generatedBy !== 'ARO' &&
                      showCheckBox &&
                      permissionsArray?.includes(
                        RESULT_MANAGEMENT.ELECTION_PROCESS_SUBMIT_FINAL_BARTA_SHEET,
                      )
                        ? t('MESSAGE_SEND_LIST_PUBLISH.MODAL.MESSAGE', {
                            TOTAL_CENTER_COUNT: rowData?.totalCenterCount,
                            CANCELLED_CENTER_COUNT:
                              rowData?.totalCancelledCenterCount,
                            APPROVED_CENTER_COUNT:
                              rowData?.totalResultApprovedCenterCount,
                          })
                        : t(
                            'MESSAGE_SEND_LIST_PUBLISH.MODAL.MESSAGE_NO_CHECKBOX',
                            {
                              TOTAL_CENTER_COUNT: rowData?.totalCenterCount,
                              CANCELLED_CENTER_COUNT:
                                rowData?.totalCancelledCenterCount,
                              APPROVED_CENTER_COUNT:
                                rowData?.totalResultApprovedCenterCount,
                            },
                          )}
                    </Text>
                  }
                  classes="bg-warning-lightest border-warning"
                />
              </div>
            </div>
            <div className="d-flex pt-10 justify-content-end gap-12">
              <Button
                size="md"
                key={4}
                type="secondary"
                className="bg-purple text-white"
                htmlType="button"
                onClick={() => {
                  handleCloseModal();
                  reset();
                }}
              >
                {t('MESSAGE_SEND_LIST_PUBLISH.RETURN_BUTTON')}
              </Button>
              <Button
                size="md"
                key={5}
                fill="fill"
                type="primary"
                htmlType="submit"
                disabled={disableButton}
              >
                {t('MESSAGE_SEND_LIST_PUBLISH.PUBLISH_BUTTON')}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default PublishModal;
