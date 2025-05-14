import { Modal } from '@pentabd/ui';
import TransferConfirmation from './TransferConfirmation';
import {
  electionMigrationValidation,
  ElectionMIgrationValidationType,
} from '@validations/election-declaration-management/election/electionMigrationValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

export const Actions = ({
  isModalOpen,
  electionSettingsIds,
  params,
  setIsModalOpen,
}: {
  electionSettingsIds: number[];
  params?: { [x: string]: string };
  isModalOpen: boolean;
  setIsModalOpen: (data: boolean) => void;
}) => {
  const methods = useForm<ElectionMIgrationValidationType>({
    resolver: yupResolver(electionMigrationValidation),
  });
  const { reset } = methods;
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setShowConfirmMessage(false);
    reset();
  };

  return (
    <Modal isOpen={isModalOpen} closeAble overlay onClose={closeModal}>
      <TransferConfirmation
        closeModal={closeModal}
        electionSettingsIds={electionSettingsIds}
        params={params}
        methods={methods}
        showConfirmMessage={showConfirmMessage}
        setShowConfirmMessage={setShowConfirmMessage}
      />
    </Modal>
  );
};
