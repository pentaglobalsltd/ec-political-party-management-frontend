import { ChangeEvent, useEffect, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputFileUpload, Text } from '@pentabd/ui';

import { FormData as AttachFileFormData } from '@validations/attachFileValidation';
import { DocumentServiceType } from '@type/candidate-info-management/operator-view/attach-file/document-service-type';
import { useDocumentService } from '@hooks/miscellaneous/documents/useDocumentService';
import { useImage } from '@hooks/miscellaneous/documents/useImage';
import { ValidateFile } from '@helpers/validate-file';
import { getDigitBanglaFromEnglish } from '@utils';
import { FILE_CATEGORY } from '@constants/file';

export interface FileUpload {
  title: string;
  subtitle?: string;
  fileContainerType?: 'image-upload' | 'default-file-upload';
  registerName: string;
  handleButtonDisable: (value: boolean) => void;
  required?: boolean;
  candidateImage: DocumentServiceType;
  maxFileSize?: number;
  usePublicUrl?: boolean;
  pathId?: string | number;
  category?: string;
}

function ImageInput({
  title,
  subtitle,
  fileContainerType = 'image-upload',
  registerName,
  handleButtonDisable,
  required,
  candidateImage,
  maxFileSize = 5,
  usePublicUrl = false,
  pathId,
  category = FILE_CATEGORY.DEFAULT,
}: FileUpload) {
  const { t } = useTranslation();
  const id = useId();
  const {
    register,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useFormContext<AttachFileFormData>();
  const { createDocumentServiceHandler, document } = useDocumentService();

  const [defaultImage, setDefaultImage] = useState('');

  const { document: image } = useImage({
    documentId: candidateImage?.documentId as string,
    fileId: candidateImage?.fileId as string,
    formatId: 1,
    filePath: candidateImage?.filePath,
  });

  useEffect(() => {
    if (image) {
      setDefaultImage(`data:image/jpeg;base64,${image}`);
    }
  }, [image]);

  useEffect(() => {
    setValue(registerName, document);

    handleButtonDisable(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerName, document]);

  const handleUpload = async (event: File) => {
    const validate = ValidateFile({
      event,
      registerName,
      fileContainerType,
      setError,
      errorMsg: t('ATTACH_FILE_ERROR_MSG.MAX_FILE_SIZE', {
        MAX_SIZE: getDigitBanglaFromEnglish(maxFileSize),
      }),
    });
    if ((await validate)?.data === true) {
      clearErrors();
      createDocumentServiceHandler({ event, usePublicUrl, pathId, category });
      handleButtonDisable(true);
    } else {
      setValue(registerName, null);
    }
  };

  return (
    <div className="d-grid grid-cols-12 mb-12">
      <div className="col-span-12 col-span-lg-3">
        <Text weight="semibold" size="sm" color="title" className="p">
          {title} {required ? <span className="text-danger">*</span> : null}
        </Text>
        {subtitle && (
          <Text weight="medium" size="xs" color="subtitle2" component="p">
            {subtitle}
          </Text>
        )}
      </div>
      <div className="col-span-12 col-span-lg-7">
        <div className="gap-6">
          <InputFileUpload
            {...register(registerName)}
            id={id}
            image={fileContainerType === 'image-upload'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.files?.[0] && handleUpload(e.target.files?.[0])
            }
            error={errors as any}
            defaultValue={defaultImage}
            getTranslation={t}
          />
          <Text
            className="mt-4"
            size="sm"
            weight="normal"
            component="h6"
            color="info"
          >
            {t('ATTACH_FILE.IMAGE_FIELD_ADDITIONAL_TEXT')}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
