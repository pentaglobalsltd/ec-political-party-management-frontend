import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Table } from '@pentabd/ui';
import { candidateConfirmationAttachmentTableColumns } from './constants';
import { useAttachFile } from '@hooks/miscellaneous/documents/useAttachFile';

const Attachments = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, electionTypeId } =
    useParams();

  const { attachFile } = useAttachFile({
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
  });

  return (
    <div className="pb-10">
      <Table
        rows={attachFile}
        columns={candidateConfirmationAttachmentTableColumns(t)}
      />
    </div>
  );
};
export default Attachments;
