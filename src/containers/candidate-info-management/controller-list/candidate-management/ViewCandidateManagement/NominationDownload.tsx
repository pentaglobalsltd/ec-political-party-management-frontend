import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@pentabd/ui';
import { usePdfGenerator } from '@hooks/miscellaneous/reports/pdf-generator';
import { useElectionExpense } from '@hooks/miscellaneous/reports/useElectionExpense';

function NominationDownload() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();
  const { loading, generateNominationAffidavitPdf } = usePdfGenerator();
  const { loading: electionExpenseLoading, getElectionExpense } =
    useElectionExpense();

  let nominationPercentage = searchParams.get('nominationPercentage');

  const handleGeneratePdfButton = () => {
    if (nominationPercentage && nominationPercentage === '100') {
      electionSettingsId &&
        candidateElectionDetailsId &&
        generateNominationAffidavitPdf({
          electionSettingsId,
          candidateElectionDetailsId,
          reportType: 'nomination',
        });
    } else {
      toast.error(t('CANDIDATE_MANAGEMENT.DOWNLOAD_NOMINATION_INCOMPLETE_MSG'));
    }
  };
  return (
    <div className="d-flex justify-content-end gap-5">
      <Button
        fill="fill"
        type="info"
        size="sm"
        onClick={handleGeneratePdfButton}
        loading={loading}
      >
        {t('CANDIDATE_APPLIED_ONLINE.DOWNLOAD_NOMINATION_BUTTON_TEXT')}
      </Button>
      <Button
        size="sm"
        fill="fill"
        type="info"
        onClick={() =>
          getElectionExpense({
            electionSettingsId: Number(electionSettingsId),
            candidateElectionDetailsId: Number(candidateElectionDetailsId),
          })
        }
        loading={electionExpenseLoading}
      >
        {t('CANDIDATE_APPLIED_ONLINE.DOWNLOAD_ELECTION_EXPENSE_BUTTON_TEXT')}
      </Button>
    </div>
  );
}

export default NominationDownload;
