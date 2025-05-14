import { useEffect, useState, useTransition } from 'react';
import { Button, ConfirmationModal, Text } from '@pentabd/ui';
import classNames from 'classnames';
import useScheduleWises from '../../hooks/election-schedule-management/election-process/data-provider-info/useScheduleWise';
import useProviderHistory from '../../hooks/election-schedule-management/election-process/data-provider-info/useProviderHistory';
import { useSearchParams } from 'react-router-dom';
import { getDigitBanglaFromEnglish, getParams } from '@utils';
import { useTranslation } from 'react-i18next';
import useScheduleWisesCount from '../../hooks/election-schedule-management/election-process/data-provider-info/useScheduleWiseCount';
import HistoryListModal from './components/HistoryListModal';
import { RUNNING_STATUS } from './constant';

const SendToAppButton = ({
  endPoint,
  moduleName,
  moduleText,
  dataExists,
  modifiedUpdatedDate,
  status,
  id,
  step,
  setStep,
  disableAll
}: {
  endPoint: string;
  dataType?: string;
  moduleName: string;
  moduleText: string;
  dataExists: boolean;
  modifiedUpdatedDate: string | null;
  status: string | null;
  id: number;
  step: number;
  setStep: any;
  disableAll: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [publishStatus, setPublishStatus] = useState<boolean>(dataExists);
  const [date, setDate] = useState<string | null>(modifiedUpdatedDate);
  const [updateStatus, setUpdateStatus] = useState<string | null>(status);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isHistoryListModal, setIsHistoryListModal] = useState(false);

  const { t } = useTranslation();

  const { electionScheduleId, regionId } = params;

  const { success, loading, getScheduleWiseData } = useScheduleWises();

  const [isPending, startTransition] = useTransition();

  const { count, getScheduleWiseCountData } = useScheduleWisesCount();

  const { lastUpdatedDate, alreadyPublished, lastUpdatedStatus, historyList, getProviderHistoryData } =
    useProviderHistory();

  const handleScheduleClick = () => {
    if (electionScheduleId) {
      getScheduleWiseData(electionScheduleId, endPoint, regionId);
    }
  };

  const openConfirmationModal = () => {
    setIsOpenConfirmModal(true);
  };

  const closeConfirmationModal = () => {
    startTransition(() => {
      setIsOpenConfirmModal(false);
    });
  };

  const openHistoryListModal = () => {
    setIsHistoryListModal(true);
  };

  const closeHistoryListModal = () => {
    startTransition(() => {
      setIsHistoryListModal(false);
    });
  };

  const handleHistoryListModal = () => {
    if (electionScheduleId) {
      getProviderHistoryData(moduleName, electionScheduleId, regionId);
      openHistoryListModal();
    }
  }

  const handleModalOpen = () => {
    if (electionScheduleId) {
      getScheduleWiseCountData(electionScheduleId, endPoint, regionId);
      openConfirmationModal();
    }
  };

  useEffect(() => {
    if (electionScheduleId && success) {
      getProviderHistoryData(moduleName, electionScheduleId, regionId);
      closeConfirmationModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    setPublishStatus(alreadyPublished);
    if (lastUpdatedDate) {
      setDate(lastUpdatedDate);
    } else {
      setDate(null);
    }
  }, [lastUpdatedDate, alreadyPublished]);

  useEffect(() => {
    setPublishStatus(dataExists);
    if (modifiedUpdatedDate) {
      setDate(modifiedUpdatedDate);
    } else {
      setDate(null);
    }
  }, [dataExists, modifiedUpdatedDate]);

  useEffect(() => {
    setUpdateStatus(lastUpdatedStatus || status);
  }, [status, lastUpdatedStatus]);

  useEffect(() => {
    if (publishStatus && step === id) {
      setStep((prev: any) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishStatus, step]);

  return (
    <div
      className={classNames('d-flex justify-content-start align-items-center')}
    >
      <div className="d-flex gap-20 justify-content-center align-items-center">
        <div className="">
          <Button
            type={publishStatus ? 'success' : 'warning'}
            className="send-to-app-button"
            size="md"
            onClick={handleModalOpen}
            disabled={id > step || updateStatus === RUNNING_STATUS || disableAll}
            key={id}
          >
            <Text weight="semibold">
              {updateStatus === RUNNING_STATUS ? t('DATA_PROVIDER_INFO.BUTTON_TEXT.PROCESS') : publishStatus
                ? t('DATA_PROVIDER_INFO.BUTTON_TEXT.RESUBMIT_TO_APP')
                : t('DATA_PROVIDER_INFO.BUTTON_TEXT.SUBMIT_TO_APP')}
            </Text>
          </Button>
        </div>
        <div className="">
          <Button
            type={'info'}
            className="send-to-app-button"
            size="md"
            onClick={handleHistoryListModal}
            key={id}
            disabled={id > step || disableAll}
          >
            <Text weight="semibold">
              {t('DATA_PROVIDER_INFO.BUTTON_TEXT.SEE_HISTORY')}
            </Text>
          </Button>
        </div>
        {date ? (
          <div className="">
            <Text>{t('DATA_PROVIDER_INFO.BUTTON_TEXT.LAST_UPDATE')}{date}</Text>
          </div>
        ) : null}
      </div>
      {!isPending ? (
        <ConfirmationModal
          portal
          overlay
          closeAble={false}
          title={`মোট ${moduleText} সংখ্যা: ${getDigitBanglaFromEnglish(count)}`}
          subTitle={`${t('DATA_PROVIDER_INFO.CONFIRMATION_MODAL.TITLE')}`}
          isOpen={isOpenConfirmModal}
          onClose={closeConfirmationModal}
          cancelButton={{
            onClick: closeConfirmationModal,
            label: `${t(
              'DATA_PROVIDER_INFO.CONFIRMATION_MODAL.CANCEL_BUTTON',
            )}`,
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: handleScheduleClick,
            label: `${t(
              'DATA_PROVIDER_INFO.CONFIRMATION_MODAL.CONFIRM_BUTTON',
            )}`,
            fill: 'fill',
            type: 'info',
            loading: loading,
          }}
        />
      ) : null}
      {!isPending ?
        <HistoryListModal isHistoryListModal={isHistoryListModal}
          closeHistoryListModal={closeHistoryListModal}
          historyList={historyList}
          moduleText={moduleText} /> : null
      }
    </div>
  );
};

export default SendToAppButton;
