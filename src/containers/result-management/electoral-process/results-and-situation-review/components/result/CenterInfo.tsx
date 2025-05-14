import { useTranslation } from 'react-i18next';
import { SummaryInfoCard } from '@pentabd/ui';

interface CenterInfoProps {
  totalPollingCenters: number;
  totalObtainedResults: number;
  totalClosedDeclared: number;
  openResultModal: () => void;
}

const CenterInfo = ({
  totalPollingCenters,
  totalObtainedResults,
  totalClosedDeclared,
  openResultModal,
}: CenterInfoProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mt-16 mb-10 d-grid grid-cols-1 gap-6 align-items-end grid-cols-xl-12">
        <div className="col-span-4">
          <SummaryInfoCard
            label={t('RESULT_AND_SITUATION_REVIEW.TOTAL_CENTER')}
            styles={{
              border: 'border-info-semi-middark',
              color: 'text-white',
              background: 'bg-info-semi-midlight',
              labelColor: 'text-white',
            }}
            value={totalPollingCenters}
          />
        </div>
        <div
          className="col-span-4 pointer"
          title={t(
            'RESULT_AND_SITUATION_REVIEW.SHOW_HIDE_VOTE_CENTER_WISE_RESULT_TABLE',
          )}
          onClick={() => openResultModal()}
        >
          <SummaryInfoCard
            label={t('RESULT_AND_SITUATION_REVIEW.RESULTS_OBTAINED')}
            styles={{
              border: 'border-purple-semi-middark',
              color: 'text-white',
              background: 'bg-purple-semi-midlight',
              labelColor: 'text-white',
            }}
            value={totalObtainedResults}
          />
        </div>
        <div className="col-span-4">
          <SummaryInfoCard
            label={t('RESULT_AND_SITUATION_REVIEW.DECLARED_CLOSED')}
            styles={{
              border: 'border-pink-semi-middark',
              color: 'text-white',
              background: 'bg-pink-semi-midlight',
              labelColor: 'text-white',
            }}
            value={totalClosedDeclared}
          />
        </div>
      </div>
    </div>
  );
};

export default CenterInfo;
