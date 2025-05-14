import { useState } from 'react';
import { Modal, Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish, getParams } from '@utils';
import VoteCenterListModal from './VoteCenterListModal';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useSearchParams } from 'react-router-dom';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { USER_TYPES } from '@constants/user-types';

function CenterList({ data, row, item }: { data: any; row: any; item: any }) {
  const [isVoteCenterListModalOpen, setIsVoteCenterListModalOpen] =
    useState<boolean>(false);
  const [modalCandidateTypeId, setModalCandidateTypeId] = useState<number>();
  const [modalStatus, setModalStatus] = useState<string>();

  const { keycloak } = useAuthWrapper();

  const userType = keycloak.tokenParsed?.userType;

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { electionSchedules } = useFiltersRedux();
  const scheduleId = electionSchedules?.[0]?.value;

  const openVoteCenterListModal = async ({ row, data }: any) => {
    setModalCandidateTypeId(data);
    setModalStatus(row?.descriptionStatus);
    setIsVoteCenterListModalOpen(true);
  };

  const closeVoteCenterListModal = () => {
    setIsVoteCenterListModalOpen(false);
  };

  return (
    <>
      {data ? (
        <div>
          <span
            className="pointer"
            onClick={() =>
              openVoteCenterListModal({
                row,
                data: item?.candidateTypeId,
              })
            }
          >
            <Text color="primary">{getDigitBanglaFromEnglish(data)}</Text>
          </span>
        </div>
      ) : (
        <span>{getDigitBanglaFromEnglish(data)}</span>
      )}

      {isVoteCenterListModalOpen ? (
        <Modal
          isOpen={isVoteCenterListModalOpen}
          closeAble
          overlay
          portal
          onClose={closeVoteCenterListModal}
        >
          {userType === USER_TYPES.ADMIN ? (
            <VoteCenterListModal
              status={modalStatus}
              scheduleId={params?.electionScheduleId}
              candidateTypeId={modalCandidateTypeId}
              userId={params?.userId}
            />
          ) : (
            <VoteCenterListModal
              status={modalStatus}
              scheduleId={scheduleId as number}
              candidateTypeId={modalCandidateTypeId}
            />
          )}
        </Modal>
      ) : null}
    </>
  );
}

export default CenterList;
