import { useTranslation } from 'react-i18next';
import { Button, Text } from '@pentabd/ui';
import { IconCheckCircleBroken } from '@pentabd/icons';
import PDFViewer from '@components/PDFViewer';
import SecondaryTableCandidatesVote from './SecondaryTableCandidatesVote';
import SecondaryTableVoteSummary from './SecondaryTableVoteSummary';

interface Props {
  pollingCenter: any;
  closeSubmitModal: any;
  fileUrl: any;
  data: any;
  successLoading: any;
  handleSubmit: () => void;
}

const SubmitModal = ({
  pollingCenter,
  closeSubmitModal,
  fileUrl,
  data,
  successLoading,
  handleSubmit,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="p-10">
      <div className="d-flex flex-column py-9">
        <Text className="mb-6" weight="semibold" size="lg">
          {`${t('SUBMIT_RESULTS.CENTER_NAME')} ${pollingCenter?.label}`}
        </Text>
      </div>
      <div className="d-grid grid-cols-12 gap-8">
        <div className=" pdf-viewer-modal col-span-5">
          <SecondaryTableCandidatesVote data={data} />
          <SecondaryTableVoteSummary data={data} />
        </div>

        <div className="overflow-y-auto pdf-viewer-modal col-span-7">
          <div className="h-100">
            <PDFViewer pdfURL={fileUrl} showZoom initialZoom={1} />
          </div>
        </div>
      </div>
      <div className="d-flex flex-row-reverse gap-6 pt-10">
        <Button
          size="xs"
          key={3}
          htmlType="button"
          type="success"
          onClick={handleSubmit}
          loading={successLoading}
        >
          {t('SUBMIT_RESULTS.MODAL_SUBMIT_BUTTON')}
          <IconCheckCircleBroken size="20" fill="white" />
        </Button>
        <Button
          size="xs"
          key={4}
          type="secondary"
          className="bg-purple text-white"
          onClick={closeSubmitModal}
        >
          {t('SUBMIT_RESULTS.MODAL_RETURN_BUTTON')}
        </Button>
      </div>
    </div>
  );
};

export default SubmitModal;
