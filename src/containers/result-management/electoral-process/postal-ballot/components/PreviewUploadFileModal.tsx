import { useTranslation } from 'react-i18next';
import { Text } from '@pentabd/ui';

import PDFViewer from '@components/PDFViewer';

const PreviewUploadFileModal = ({ fileUrl }: any) => {
  const { t } = useTranslation();

  return (
    <div className="p-10">
      <div className="d-flex flex-column py-9">
        <Text className="mb-6" weight="semibold" size="md">
          {t('SUBMIT_RESULTS.PREVIEW_MODAL_TITLE')}
        </Text>
      </div>
      <div className="overflow-y-auto pdf-viewer-modal">
        <div className="h-100">
          <PDFViewer pdfURL={fileUrl} showZoom />
        </div>
      </div>
    </div>
  );
};

export default PreviewUploadFileModal;
