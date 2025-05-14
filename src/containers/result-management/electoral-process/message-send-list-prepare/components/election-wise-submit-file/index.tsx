import { ELECTION_INFO } from '@constants/election-info';
import DefaultElection from './DefaultElection';
import UnionParishadElection from './UnionParishadElection';

export default function ElectionWiseSubmitFile({
  electionTypeId,
  handlePreviewButton,
  setPdfBuffer,
  pdfLoading,
  electionScheduleId,
  electionSettingsId,
  permissionsArray,
  userId,
  userType,
}: {
  electionTypeId: number;
  handlePreviewButton: () => void;
  setPdfBuffer: any;
  pdfLoading: boolean;
  electionScheduleId: number | string;
  electionSettingsId: number | string;
  userId: string;
  permissionsArray?: string[];
  userType?: string;
}) {
  const electionWiseRender = (electionTypeId: number) => {
    switch (electionTypeId) {
      case ELECTION_INFO.UNION_PARISHAD.ID:
        return (
          <UnionParishadElection
            handlePreviewButton={handlePreviewButton}
            setPdfBuffer={setPdfBuffer}
            pdfLoading={pdfLoading}
            electionScheduleId={electionScheduleId}
            electionSettingsId={electionSettingsId}
            permissionsArray={permissionsArray}
            userId={userId}
            userType={userType}
          />
        );
      default:
        return (
          <DefaultElection
            handlePreviewButton={handlePreviewButton}
            setPdfBuffer={setPdfBuffer}
            pdfLoading={pdfLoading}
            electionScheduleId={electionScheduleId}
            electionSettingsId={electionSettingsId}
            permissionsArray={permissionsArray}
            userId={userId}
            userType={userType}
          />
        );
    }
  };

  return <>{electionWiseRender(electionTypeId)}</>;
}
