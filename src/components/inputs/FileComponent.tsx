import { ChangeEvent, useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { IconTrash01 } from '@pentabd/icons';
import { FileInfoCard, Text, InputFileUpload, InputText } from '@pentabd/ui';

import { useDocumentService } from '@hooks/miscellaneous/documents/useDocumentService';
import { ValidateFile } from '@helpers/validate-file';
import { DocumentServiceType } from '@type/documents/document-service-type';
import { getDigitBanglaFromEnglish } from '@utils';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { FileType } from '@type/candidate-info-management/nomination-list-type';
import SmallLoadingComponent from '@components/small-loading-component';
import { FILE_CATEGORY } from '@constants/file';

export interface fileUpload {
  registerName: string;
  title?: string;
  subtitle?: string;
  handleButtonDisable?: (value: boolean) => void;
  required?: boolean;
  maxFileSize?: number;
  additionalText?: string;
  tableFileComponent?: boolean; // it shows the file in a table as usual InputFile can't be used there
  minWidth?: boolean;
  fullGridWidth?: boolean; // input file will take full width
  onlyFileInfoCard?: boolean; // if only want to show the card only
  downloadData?: FileType; // you have to give data for download here(mainly used in secondary tables)
  disabledOption?: boolean; //can purposely disabled the button in table file input
  colClassNameOne?: string;
  colClassNameTwo?: string;
  disabledUpload?: boolean;
  onUpload?: (document: DocumentServiceType) => void;
  pathId?: string | number;
  category?: string;
  className?: string;
}

function FileComponent({
  title,
  subtitle,
  registerName,
  handleButtonDisable,
  required,
  maxFileSize = 5,
  additionalText,
  tableFileComponent = false,
  minWidth,
  fullGridWidth = false,
  onlyFileInfoCard = false,
  downloadData,
  disabledOption = false,
  colClassNameOne,
  colClassNameTwo,
  disabledUpload = false,
  onUpload,
  pathId,
  category = FILE_CATEGORY.DEFAULT,
  className,
}: fileUpload) {
  const { t } = useTranslation();
  const id = useId();

  const {
    register,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useFormContext();
  const { downloadAttachFileHandler } = useDownloadAttachFile();
  const {
    createDocumentServiceHandler,
    document,
    success,
    error,
    errorMessage,
    percent,
    loading,
  } = useDocumentService();
  const [fileUploaded, setFileUploaded] = useState<string>();
  const keysToCheck = ['documentId', 'fileId', 'filename', 'fileType'];

  const getData: DocumentServiceType = getValues(registerName);

  function validateKeys(obj: DocumentServiceType, keysToCheck: string[]) {
    for (const key of keysToCheck) {
      if (!obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  const onClickDeleteFile = () => {
    if (disabledOption === false) {
      setValue(registerName, null);
      setFileUploaded('');
      clearErrors(registerName);
      handleButtonDisable && handleButtonDisable(false);
    }
  };

  const DeleteOption = () => {
    return (
      <div onClick={onClickDeleteFile} className="pointer">
        <Text color="danger" size="sm">
          Delete
        </Text>
      </div>
    );
  };

  const handleUpload = async (event: File) => {
    const validate = ValidateFile({
      event,
      registerName,
      setError,
      fileSize: maxFileSize,
      errorMsg: t('ATTACH_FILE_ERROR_MSG.MAX_FILE_SIZE', {
        MAX_SIZE: getDigitBanglaFromEnglish(maxFileSize),
      }),
    });
    if ((await validate)?.data === true) {
      clearErrors(registerName);
      setFileUploaded(event?.name);
      createDocumentServiceHandler({ event, pathId, category });
      handleButtonDisable && handleButtonDisable(true);
    } else {
      setValue(registerName, null);
    }
  };

  const Download = () => {
    return (
      <div
        onClick={() =>
          downloadAttachFileHandler({
            documentId: downloadData?.documentId,
            fileId: downloadData?.fileId,
            fileType: downloadData?.fileType,
            formatId: 2,
            filePath: downloadData?.filePath,
          })
        }
        className="pointer"
      >
        <Text color="primary" size="sm">
          {t('CANDIDATE_CONFIRMATION.DOWNLOAD')}
        </Text>
      </div>
    );
  };

  useEffect(() => {
    if (error) {
      handleButtonDisable && handleButtonDisable(true);
      setError(registerName, {
        type: 'custom',
        message: errorMessage,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (success) {
      if (validateKeys(document, keysToCheck)) {
        setValue(registerName, document);
        handleButtonDisable && handleButtonDisable(false);
        onUpload && onUpload(document);
      } else {
        handleButtonDisable && handleButtonDisable(true);
        setError(registerName, {
          type: 'custom',
          message: errorMessage,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerName, document, success]);

  useEffect(() => {
    if (getData && Object.keys(getData).length > 0) {
      setFileUploaded(getData?.filename);
    } else if (!fileUploaded || !getData) {
      setFileUploaded('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);

  return (
    <div
      className={classNames({
        'd-grid grid-cols-12 mb-12': !tableFileComponent && !fullGridWidth,
      })}
    >
      {title || subtitle ? (
        <div
          className={classNames('col-span-12 col-span-lg-3', colClassNameOne)}
        >
          <Text weight="semibold" size="sm" color="title" className="p">
            {title} {required ? <span className="text-danger">*</span> : null}
          </Text>
          {subtitle && (
            <Text weight="medium" size="xs" color="subtitle2" component="p">
              {subtitle}
            </Text>
          )}
        </div>
      ) : null}
      <div className={classNames('col-span-12 col-span-lg-6', colClassNameTwo)}>
        {fileUploaded || onlyFileInfoCard ? (
          tableFileComponent ? (
            //file exists and in table
            <div>
              <FileInfoCard
                key={id}
                withoutBg={true}
                title={downloadData ? downloadData?.filename : fileUploaded}
                fixedWidth
                secondaryComponent={
                  downloadData ? <Download /> : <DeleteOption />
                }
              />
              <ErrorMessage
                errors={errors}
                name={registerName}
                render={() => <Text color="danger">{errorMessage}</Text>}
              />
            </div>
          ) : (
            //file exists and in form
            <div>
              <FileInfoCard
                endIcon={
                  loading ? (
                    <SmallLoadingComponent />
                  ) : (
                    <IconTrash01 size={16} />
                  )
                }
                title={fileUploaded}
                progressBar={{
                  type: error ? 'danger' : 'primary',
                  size: 'sm',
                  progress: error ? 0 : getData?.filename ? 100 : percent,
                  showProgressNumber: true,
                }}
                onClickIcon={onClickDeleteFile}
                secondaryComponent={
                  downloadData ? <Download /> : <DeleteOption />
                }
              />

              <ErrorMessage
                errors={errors}
                name={registerName}
                render={() => <Text color="danger">{errorMessage}</Text>}
              />
            </div>
          )
        ) : tableFileComponent ? (
          //file does not exist (not uploaded) and in table

          <InputText
            {...register(registerName)}
            minWidth={minWidth}
            type="file"
            controlling
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.files?.[0] && handleUpload(e.target.files?.[0])
            }
            error={errors as any}
            getTranslation={t}
            disabled={disabledOption}
          />
        ) : (
          //file does not exist (not uploaded) and in form
          <div>
            <InputFileUpload
              {...register(registerName)}
              id={id}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                e.target?.files?.[0] && handleUpload(e.target.files?.[0])
              }
              error={errors as any}
              getTranslation={t}
              disabled={disabledUpload}
              className={className}
            />

            {additionalText && (
              <Text
                className="mt-4"
                size="sm"
                weight="normal"
                component="h6"
                color="info"
              >
                {additionalText}
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileComponent;
