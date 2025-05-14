import { useState } from 'react';

import { Modal } from '@pentabd/ui';
import SendSmsModal from './SendSmsModal';
import { IconPasscodeLock } from '@pentabd/icons';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

function SendSms({ row }: { row: any }) {
  const [isOpenSmsModal, setIsOpenSmsModal] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});

  const openSmsModal = (row: any) => {
    setRowData(row);
    setIsOpenSmsModal(true);
  };

  const closeSmsModal = () => {
    setIsOpenSmsModal(false);
  };

  return (
    <>
      <div
        className="ms-3 px-6 pointer"
        data-tooltip-id="my-tooltip"
        data-tooltip-html="Change password"
        onClick={() => openSmsModal(row)}
      >
        <IconPasscodeLock size="20" fill="primary" />
      </div>

      <Tooltip id="my-tooltip" />
      {isOpenSmsModal ? (
        <Modal
          isOpen={isOpenSmsModal}
          closeAble
          overlay
          onClose={closeSmsModal}
          portal
        >
          <SendSmsModal closeSmsModal={closeSmsModal} rowData={rowData} />
        </Modal>
      ) : null}
    </>
  );
}

export default SendSms;
