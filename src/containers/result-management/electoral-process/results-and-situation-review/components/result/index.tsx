import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Table } from '@pentabd/ui';

import ResultModal from './ResultModal';
import { resultTableColumns } from './constants';
import CenterInfo from './CenterInfo';
import VoterInfo from './VoterInfo';
import { ResultType } from './useResult';
import { CANDIDATE_INFO } from '@constants/candidate-info';

interface ResultProps {
  resultDetails?: ResultType;
}

const Result = ({ resultDetails }: ResultProps) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const isShowPoliticalPartyColumn = [
    CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
    CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
  ].includes(resultDetails?.results?.candidateTypeId);

  const openResultModal = () => {
    setIsResultModalOpen(true);
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
  };

  return (
    <>
      {Object.keys(resultDetails?.overallSummary || {})?.length !== 0 ? (
        <CenterInfo
          totalPollingCenters={
            resultDetails?.overallSummary?.totalPollingCenters
          }
          totalObtainedResults={
            resultDetails?.overallSummary?.totalObtainedResults
          }
          totalClosedDeclared={
            resultDetails?.overallSummary?.totalClosedDeclared
          }
          openResultModal={openResultModal}
        />
      ) : null}

      {Object.keys(resultDetails?.overallSummary || {})?.length !== 0 ? (
        <VoterInfo
          totalVoter={resultDetails?.overallSummary?.totalVoter}
          totalMaleVoter={resultDetails?.overallSummary?.totalMaleVoter}
          totalFemaleVoter={resultDetails?.overallSummary?.totalFemaleVoter}
          totalThirdGenderVoter={
            resultDetails?.overallSummary?.totalThirdGenderVoter
          }
        />
      ) : null}

      {resultDetails?.overallSummary?.candidateSummarizedResults ? (
        <div className="pb-10">
          <Table
            columns={resultTableColumns({
              t,
              isShowPoliticalPartyColumn,
            })}
            rows={resultDetails?.overallSummary?.candidateSummarizedResults}
            loading={resultDetails?.overallSummaryLoading}
            loadingItemCount={4}
          />
        </div>
      ) : null}

      <Modal
        key={1}
        isOpen={isResultModalOpen}
        closeAble
        overlay
        portal
        onClose={closeResultModal}
      >
        <div className="vw-100 overflow-x-auto">
          <ResultModal
            dynamicColumns={resultDetails?.results?.dynamicColumns}
            candidateResults={resultDetails?.results?.candidateResults}
            loading={resultDetails?.resultsLoading}
            closeResultModal={closeResultModal}
          />
        </div>
      </Modal>
    </>
  );
};

export default Result;
