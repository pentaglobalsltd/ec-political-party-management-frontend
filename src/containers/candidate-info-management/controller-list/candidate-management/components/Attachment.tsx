import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Table } from '@pentabd/ui';

import { useAttachFile } from '@hooks/miscellaneous/documents/useAttachFile';
import { attachmentTableColumns } from '../constants';

function Attachment() {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, electionTypeId } =
    useParams();

  const { attachFile } = useAttachFile({
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
  });

  return (
    <div className="container-95">
      <Table rows={attachFile} columns={attachmentTableColumns(t)} />
    </div>
  );
}

export default Attachment;
