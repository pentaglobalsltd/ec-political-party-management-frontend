import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { t } from 'i18next';
import { Button } from '@pentabd/ui';
import FileComponent from '@components/inputs/FileComponent';
import { FILE_CATEGORY } from '@constants/file';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import { MESSAGE_SEND_LIST_PREPARE } from '../..';
import { USER_TYPES } from '@constants/user-types';
import { useCreateSendingMessageListPrepare } from '@hooks/result-management/electoral-process/message-sending-list-prepare/useCreateSendingMessageListPrepare';

export default function DefaultElection({
  handlePreviewButton,
  setPdfBuffer,
  pdfLoading,
  electionScheduleId,
  electionSettingsId,
  permissionsArray,
  userId,
  userType,
}: {
  handlePreviewButton: () => void;
  setPdfBuffer: any;
  pdfLoading: boolean;
  electionScheduleId: number | string;
  electionSettingsId: number | string;
  userId: string;
  permissionsArray?: string[];
  userType?: string;
}) {
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const { addSendingMessageListPrepare, loading, success } =
    useCreateSendingMessageListPrepare();
  const { handleSubmit, setValue } = useFormContext();

  const onSubmit = (data: any) => {
    const mappedData = {
      electionScheduleId,
      electionSettingsId,
      file: { ...data?.attachFile },
      userId: userType === USER_TYPES.ADMIN ? userId : '',
    };

    addSendingMessageListPrepare(mappedData);
  };

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  useEffect(() => {
    if (success) {
      setPdfBuffer(null);
      setValue(MESSAGE_SEND_LIST_PREPARE.ATTACH_FILE, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);
  return (
    <form className="py-8" onSubmit={handleSubmit(onSubmit)}>
      <FileComponent
        title={t('MESSAGE_SEND_LIST_PREPARE.UPLOAD_MESSAGE_SHEET')}
        registerName={MESSAGE_SEND_LIST_PREPARE.ATTACH_FILE}
        additionalText={t('MESSAGE_SEND_LIST_PREPARE.UPLOAD_WARNINGS')}
        handleButtonDisable={handleButtonDisable}
        required
        pathId={electionScheduleId}
        category={FILE_CATEGORY.RMS}
      />
      <div className="col-12 d-flex justify-content-end gap-6">
        <Button
          fill="fill"
          type="primary"
          loading={pdfLoading || disableButton}
          onClick={handlePreviewButton}
        >
          {t('MESSAGE_SEND_LIST_PREPARE.SEE_PREVIEW')}
        </Button>
        {permissionsArray?.includes(
          RESULT_MANAGEMENT.ELECTION_PROCESS_BARTA_SHEET_PREP,
        ) ? (
          <Button
            fill="fill"
            className="border-primary"
            type="success"
            htmlType="submit"
            loading={loading}
            disabled={disableButton}
          >
            {t('MESSAGE_SEND_LIST_PREPARE.APPROVED')}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
