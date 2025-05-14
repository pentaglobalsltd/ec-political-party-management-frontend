import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { IconEye, IconUploadCloud01 } from '@pentabd/icons';
import { Button, Modal } from '@pentabd/ui';
import { useState } from 'react';
import FileModal from './FileModal';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';

function FileUpload({
  data,
  row,
  getElectionSettingsData,
}: {
  data: any;
  row: any;
  getElectionSettingsData: any;
}) {
  const [tableRow, setTableRow] = useState<number>();
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [individualData, setIndividualData] = useState();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { downloadAttachFileHandler, loading: fileViewLoading } =
    useDownloadAttachFile();

  const openFileModal = (row: any) => {
    setIsFileModalOpen(true);
    setIndividualData(row);
  };

  const closeFileModal = () => {
    setIsFileModalOpen(false);
  };

  const getDataOnSuccess = () => {
    getElectionSettingsData({
      searchItems: params,
      page: params?.page ? parseInt(params.page, 10) : 0,
    });
  };

  return (
    <>
      <div>
        {data === null ? (
          <Button type="primary" onClick={() => openFileModal(row)}>
            <IconUploadCloud01 fill="light" size="20" />
          </Button>
        ) : (
          <Button
            type="default"
            fill="fill"
            loading={tableRow === row.id ? fileViewLoading : false}
            onClick={() => {
              downloadAttachFileHandler({
                documentId: data?.documentId,
                fileId: data?.fileId,
                fileType: data.fileType,
                formatId: 2,
                filePath: data?.filePath,
              });
              setTableRow(row.id);
            }}
          >
            <IconEye fill="primary" size="20" />
          </Button>
        )}
      </div>

      {isFileModalOpen ? (
        <Modal
          isOpen={isFileModalOpen}
          closeAble
          overlay
          portal
          onClose={closeFileModal}
        >
          <FileModal
            individualData={individualData}
            closeFileModal={closeFileModal}
            getDataOnSuccess={getDataOnSuccess}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default FileUpload;
