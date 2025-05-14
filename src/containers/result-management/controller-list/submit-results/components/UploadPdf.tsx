import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import FileComponent from '@components/inputs/FileComponent';
import { FORM_FIELDS } from '@constants/forms';

import { SubmitResultContext } from '../context/submitResultContext';
import { Text } from '@pentabd/ui';
import { DocumentServiceType } from '@type/documents/document-service-type';
import { SelectOptionArray } from '@type/selection-option-type';
import { FILE_CATEGORY } from '@constants/file';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const UploadPdf = ({
  electionSchedules,
  disabled,
  className,
}: {
  electionSchedules?: SelectOptionArray[];
  disabled: boolean;
  className?: string;
}) => {
  const { t } = useTranslation();

  const { updateButtonStates, downloadAttachFileHandler, fileUploadDisable } =
    useContext(SubmitResultContext)!;

  const handleButtonDisable = (value: boolean) => {
    updateButtonStates({ disableButton: value });
  };

  const onUpload = (document: DocumentServiceType) => {
    downloadAttachFileHandler({
      documentId: document?.documentId,
      fileId: document?.fileId,
      fileType: document?.fileType,
      formatId: 2,
      generateLinkOnly: true,
      filePath: document?.filePath,
    });
  };

  return (
    <>
      {/* File upload with open preview modal button */}
      <div className="d-grid grid-cols-1 grid-cols-lg-1">
        <Text weight="semibold" size="sm" color="title" className="p">
          {t('SUBMIT_RESULTS.UPLOAD')} <span className="text-danger">*</span>
        </Text>
        <div className="col-span-1 pt-10">
          <FileComponent
            additionalText={t('SUBMIT_RESULTS.UPLOAD_WARNINGS')}
            registerName={SUBMIT_RESULTS.RESULT_FILE}
            handleButtonDisable={handleButtonDisable}
            required
            onUpload={onUpload}
            colClassNameOne="col-span-lg-12"
            colClassNameTwo="col-span-lg-10"
            disabledUpload={fileUploadDisable || disabled}
            category={FILE_CATEGORY.RMS}
            pathId={electionSchedules?.[0]?.value}
            className={className}
          />
        </div>
      </div>
    </>
  );
};

export default UploadPdf;
