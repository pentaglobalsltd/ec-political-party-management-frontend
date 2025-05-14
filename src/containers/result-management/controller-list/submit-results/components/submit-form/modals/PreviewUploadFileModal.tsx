import { useTranslation } from 'react-i18next';
import { Text } from '@pentabd/ui';

import PDFViewer from '@components/PDFViewer';
import { useEffect, useRef } from 'react';

interface Props {
  fileUrl: string;
}

const PreviewUploadFileModal = ({ fileUrl }: Props) => {
  const { t } = useTranslation();
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pdfRef && pdfRef.current) {
      pdfRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [fileUrl]);

  return (
    <div className="px-10">
      <div className="d-flex flex-column py-9">
        <Text className="mb-6" weight="semibold" size="md">
          {t('SUBMIT_RESULTS.PREVIEW_MODAL_TITLE')}
        </Text>
      </div>
      <div className="overflow-y-auto pdf-viewer-modal" ref={pdfRef}>
        <div className="h-100">
          <PDFViewer pdfURL={fileUrl} showZoom initialZoom={0.75} />
        </div>
      </div>
    </div>
  );
};

export default PreviewUploadFileModal;
