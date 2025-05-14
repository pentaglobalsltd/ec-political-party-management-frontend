import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Header, Table, Text } from '@pentabd/ui';

import {
  candidateStatusHistoryTableColumns,
  candidateStatusHistoryTableBreadcrumbs,
} from '../constants';

import { useCandidateStatusHistory } from '@hooks/candidate-info-management/controller-list/candidate-management-dashboard/useCandidateStatusHistory';

type CandidateInfo = {
  candidateName: string;
  constituency: string;
};

function ViewCandidateStatusHistory() {
  const { t } = useTranslation();
  const params = useParams();

  const { candidateElectionDetailsId, electionSettingsId } = params;

  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo | null>(
    null,
  );

  const {
    isStatusHistoryLoading,
    statusHistoryList,
    getCandidateStatusHistoryListData,
  } = useCandidateStatusHistory();

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      getCandidateStatusHistoryListData({
        id: electionSettingsId || '',
        detailsId: candidateElectionDetailsId || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsId, candidateElectionDetailsId]);

  useEffect(() => {
    const candidateInfo = localStorage.getItem('candidateInfoForStatusHistory');
    setCandidateInfo(candidateInfo ? JSON.parse(candidateInfo) : null);
  }, []);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('CANDIDATE_MANAGEMENT.CANDIDATE_STATUS_HISTORY_DASHBOARD'),
        }}
        breadcrumbs={candidateStatusHistoryTableBreadcrumbs(t)}
      />

      <div>
        <div className="mb-4">
          <Text size="md" weight="bold">
            {`${t(
              'CANDIDATE_MANAGEMENT.STATUS_HISTORY_TABLE.CANDIDATE_NAME',
            )}: ${candidateInfo?.candidateName || ''} `}
          </Text>
        </div>
        <div>
          <Text size="sm" weight="semibold">
            {`${t('CANDIDATE_MANAGEMENT.STATUS_HISTORY_TABLE.CONSTITUENCY')}: ${
              candidateInfo?.constituency || ''
            } `}
          </Text>
        </div>
      </div>

      <div className="my-10">
        <Table
          rows={statusHistoryList}
          columns={candidateStatusHistoryTableColumns(t)}
          loading={isStatusHistoryLoading}
          loadingItemCount={10}
        />
      </div>
    </div>
  );
}

export default ViewCandidateStatusHistory;
