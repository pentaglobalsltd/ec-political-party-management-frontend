import DownloadAttachFile from '@components/DownloadAttachedFileInsideTableRow';
import { MESSAGE_SHEET } from '@constants/polling-center-results';
import { FINAL_SHEET_STATUS, GENERATED_BY } from '../constants';
import { getDigitBanglaFromEnglish } from '@utils';

function DownloadFile({ row }: { row: any }) {
  if (
    row?.generatedBy === GENERATED_BY.RO &&
    row?.sheetStatus === FINAL_SHEET_STATUS
  ) {
    return (
      <DownloadAttachFile
        label={`${MESSAGE_SHEET} - ${getDigitBanglaFromEnglish(
          row?.sheetSerial,
        )}`}
        documentId={row?.finalFile?.documentId}
        fileId={row?.finalFile?.fileId}
        fileType={row?.finalFile?.fileType}
        formatId={2}
        filePath={row?.finalFile?.filePath}
      />
    );
  } else if (
    row?.generatedBy === GENERATED_BY.RO &&
    row?.sheetStatus !== FINAL_SHEET_STATUS
  ) {
    return (
      <DownloadAttachFile
        label={`${MESSAGE_SHEET} - ${getDigitBanglaFromEnglish(
          row?.sheetSerial,
        )}`}
        documentId={row?.file?.documentId}
        fileId={row?.file?.fileId}
        fileType={row?.file?.fileType}
        formatId={2}
        filePath={row?.file?.filePath}
      />
    );
  } else {
    return null;
  }
}

export default DownloadFile;
