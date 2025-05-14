import { useEffect, useState } from 'react';
import { Button, ConfirmationModal, Modal, Text } from '@pentabd/ui';
import { t } from 'i18next';
import { IconCheckCircleBroken } from '@pentabd/icons';
import useVoterAreaBulkUpdate from '@hooks/vote-center-management/main-list/voter-areas/useVoterAreaBulkUpdate';
import { ElectionDetailsListProps } from '@hooks/vote-center-management/main-list/voter-areas/useVoterAreaGetList';

const UpdateBulkEdit = ({
  unionWards,
  ids,
  getVoterAreaListData,
  params,
}: {
  unionWards: any;
  ids: number[];
  getVoterAreaListData: (data: ElectionDetailsListProps) => void;
  params?: any;
  setSelectedItemsIds: (data: number[]) => void;
}) => {
  const { updateBulkVoterArea, loading, success, setSuccess } =
    useVoterAreaBulkUpdate();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mappedData, setMappedData] = useState<any[]>([]);

  const handleOpenModal = () => {
    const reqBody = ids
      .map((id) => {
        return {
          id,
          unionWardId: unionWards?.[`bulkEditUnionWards-${id}`],
        };
      })
      .filter((obj) => obj.unionWardId);

    if (reqBody?.length) {
      setIsSubmitModalOpen(true);
      setMappedData(reqBody);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsSubmitModalOpen(false);
  };

  const submitBulkEdit = () => {
    updateBulkVoterArea({ voterAreas: mappedData });
  };

  useEffect(() => {
    if (success) {
      getVoterAreaListData({
        searchItems: params,
      });
      setSuccess(false);
      setIsSubmitModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <Button
        fill="fill"
        className="border-primary"
        htmlType="button"
        // disabled={true}
        onClick={handleOpenModal}
        loading={loading}
      >
        <Text size="sm" weight="semibold">
          {t('SYMBOL.SUBMIT')}
        </Text>
        <IconCheckCircleBroken size="20" fill="dark" />
      </Button>
      {isSubmitModalOpen ? (
        <ConfirmationModal
          title={`${t('VOTER_AREA.BULK_UPDATE')}`}
          onClose={handleCloseModal}
          isOpen={isSubmitModalOpen}
          portal
          cancelButton={{
            onClick: handleCloseModal,
            label: `${t('CANDIDATE_PERSONAL_INFO.CANCEL_BUTTON_TEXT')}`,
            fill: 'outline',
            type: 'light',
            disabled: loading,
            loading: loading,
          }}
          confirmButton={{
            onClick: submitBulkEdit,
            label: `${t('CANDIDATE_PERSONAL_INFO.CONFIRM_BUTTON_TEXT')}`,
            fill: 'fill',
            type: 'info',
            disabled: loading,
            loading: loading,
          }}
        />
      ) : null}
      {isModalOpen ? (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          portal
        >
          <div className="p-20 d-flex flex-column justify-items-center align-items-center gap-10">
            <Text size="md">{t('VOTER_AREA.SELECT_UNION_MESSAGE')}</Text>
            <Button
              fill="fill"
              type="primary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              {t('VOTER_AREA.OKAY')}
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default UpdateBulkEdit;
