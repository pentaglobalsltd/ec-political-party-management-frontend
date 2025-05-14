import { usePdfGenerator } from '@hooks/miscellaneous/reports/pdf-generator';
import { useElectionExpense } from '@hooks/miscellaneous/reports/useElectionExpense';
import { Badge, Button, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const CandidateSummary = ({ candidateDetails }: any) => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();
  const { loading, generateNominationAffidavitPdf } = usePdfGenerator();
  const { loading: electionExpenseLoading, getElectionExpense } =
    useElectionExpense();

  return (
    <div className="pb-12 mb-18 border-bottom">
      <Text
        weight="semibold"
        size="lg"
        color="dark"
        component="h2"
        className="mb-8"
      >
        {t('CANDIDATE_APPLIED_ONLINE.CANDIDATE_INFO')}
      </Text>

      {/* Candidate Info */}
      <div className="bg-info-lightest py-8 px-16">
        <div className="d-grid grid-cols-1 grid-cols-lg-12 mb-16 gap-10">
          <div className="col-span-lg-3 col-span-1 d-flex flex-column gap-2">
            <Text weight="normal" size="sm" color="subtitle2">
              {t('CANDIDATE_APPLIED_ONLINE.CANDIDATE_NAME')}
            </Text>
            <Text color="title">{candidateDetails?.candidateName}</Text>
          </div>
          <div className="col-span-lg-3 col-span-1 d-flex flex-column gap-2">
            <Text weight="normal" size="sm" color="subtitle2">
              {t('CANDIDATE_APPLIED_ONLINE.MOBILE')}
            </Text>
            <Text color="title">{candidateDetails?.phone}</Text>
          </div>
          <div className="col-span-lg-3 col-span-1 d-flex flex-column gap-2">
            <Text weight="normal" size="sm" color="subtitle2">
              {t('CANDIDATE_APPLIED_ONLINE.EMAIL')}
            </Text>
            <Text color="title">{candidateDetails?.email}</Text>
          </div>
          <div className="col-span-lg-3 col-span-1 d-flex flex-column gap-2">
            <Text weight="normal" size="sm" color="subtitle2">
              {t('CANDIDATE_APPLIED_ONLINE.VOTER_AREA')}
            </Text>
            <Text color="title">{candidateDetails?.constituency}</Text>
          </div>

          <div className="col-span-lg-3 col-span-1 d-flex flex-column gap-2">
            <Text weight="normal" size="sm" color="subtitle2">
              {t('CANDIDATE_APPLIED_ONLINE.SEAT_NAME')}
            </Text>
            <Text color="title">{candidateDetails?.candidateType}</Text>
          </div>
          <div className="col-span-lg-3 col-span-1 d-flex flex-column gap-2">
            <Text weight="normal" size="sm" color="subtitle2">
              {t('CANDIDATE_APPLIED_ONLINE.CONDITION')}
            </Text>
            <div className="d-flex">
              <Badge
                size="sm"
                label={candidateDetails?.nominationStatus}
                type="warning"
                className="fs-medium fw-medium text-danger"
              />
            </div>
          </div>
          <div className="col-span-lg-3 col-span-1 d-flex flex-column gap-3">
            <Text weight="normal" size="sm" color="subtitle2">
              {t('CANDIDATE_APPLIED_ONLINE.SUBMITTED_NOMINATION_LETTER')}
            </Text>
            <Button
              fill="fill"
              type="info"
              size="sm"
              onClick={() =>
                electionSettingsId &&
                candidateElectionDetailsId &&
                generateNominationAffidavitPdf({
                  electionSettingsId,
                  candidateElectionDetailsId,
                  reportType: 'nomination',
                })
              }
              className="w-50"
              loading={loading}
            >
              {t('CANDIDATE_APPLIED_ONLINE.DOWNLOAD_NOMINATION_BUTTON_TEXT')}
            </Button>
          </div>
          <div className="col-span-lg-3 col-span-1 d-flex flex-column gap-2">
            <Text weight="normal" size="sm" color="subtitle2">
              {t(
                'CANDIDATE_APPLIED_ONLINE.DOWNLOAD_ELECTION_EXPENSE_BUTTON_TEXT',
              )}
            </Text>
            <Button
              size="sm"
              fill="fill"
              type="info"
              onClick={() =>
                getElectionExpense({
                  electionSettingsId: Number(electionSettingsId),
                  candidateElectionDetailsId: Number(
                    candidateElectionDetailsId,
                  ),
                })
              }
              className="w-50"
              loading={electionExpenseLoading}
            >
              {t(
                'CANDIDATE_APPLIED_ONLINE.DOWNLOAD_ELECTION_EXPENSE_BUTTON_TEXT',
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSummary;
