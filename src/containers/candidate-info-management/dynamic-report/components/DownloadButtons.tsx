import { useState, useTransition } from 'react';

import { Button, Modal } from '@pentabd/ui';

import AdditionalQueryModal from './Modal/AdditionalQueryModal';

import { REPORT_TYPE } from '../edit/constants';
import { IconExcel } from '@images/icons';
import IconCSV from '@images/icons/IconCSV';
import IconJSON from '@images/icons/IconJSON';
import { MappedDynamicReportType } from '@type/candidate-info-management/dynamic-report/dynamic-report-listing-type';

interface Props {
  data: MappedDynamicReportType;
}

const DownloadReportButtons = (data: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [reportType, setReportType] = useState<string>('');

  const handleDownloadButtonClicked = (buttonType: string) => {
    switch (buttonType) {
      case REPORT_TYPE.EXCEL:
        setReportType(REPORT_TYPE.EXCEL);
        setIsOpen(true);
        break;

      case REPORT_TYPE.CSV:
        setReportType(REPORT_TYPE.CSV);
        setIsOpen(true);
        break;

      case REPORT_TYPE.JSON:
        setReportType(REPORT_TYPE.JSON);
        setIsOpen(true);
        break;

      default:
        break;
    }
  };

  const handleCloseModal = () => {
    startTransition(() => {
      setIsOpen(false);
    });
  };

  return (
    <div className="d-flex gap-4">
      <Button
        key={1}
        size="xs"
        type="light"
        fill="transparent"
        htmlType="button"
        className="border bg-white"
        onClick={() => handleDownloadButtonClicked(REPORT_TYPE.EXCEL)}
      >
        <IconExcel size="20" />
      </Button>

      <Button
        key={2}
        size="xs"
        type="light"
        fill="transparent"
        htmlType="button"
        className="border bg-white"
        onClick={() => handleDownloadButtonClicked(REPORT_TYPE.CSV)}
      >
        <IconCSV size="20" fill="fill-subtitle2" />
      </Button>

      <Button
        key={3}
        size="xs"
        type="light"
        fill="transparent"
        htmlType="button"
        className="border bg-white"
        onClick={() => handleDownloadButtonClicked(REPORT_TYPE.JSON)}
      >
        <IconJSON size="20" fill="fill-subtitle2" />
      </Button>

      {!isPending ? (
        <Modal portal overlay isOpen={isOpen} onClose={handleCloseModal}>
          <AdditionalQueryModal
            handleCloseModal={handleCloseModal}
            reportType={reportType}
            rowData={data?.data}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default DownloadReportButtons;
