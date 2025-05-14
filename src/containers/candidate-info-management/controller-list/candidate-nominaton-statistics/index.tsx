import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Table, Text } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';

import { USER_TYPES } from '@constants/user-types';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import {
  allSelectedData,
  candidateNominationStatisticsBreadcrumbs,
  candidateNominationStatisticsTableColumns,
  paymentTableColumns,
  searchStruct,
} from './constants';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useCandidateNominationStatistics } from '@hooks/candidate-info-management/controller-list/candidate-nominaton-statistics/useCandidateNominationStatistics';
import { getParams } from '@utils';
import { useCandidateNominationPaymentTable } from '@hooks/candidate-info-management/controller-list/candidate-nominaton-payment-table/useCandidateNominationPaymentTable';

export const CandidateNominationStatistics = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    getCandidateNominationStatisticsData,
    candidateNominationStatisticsDetails,
    loading: loadingStatusTable,
  } = useCandidateNominationStatistics();

  const {
    candidatePaymentTable,
    getCandidatePaymentTableData,
    loading: loadingPaymentTable,
  } = useCandidateNominationPaymentTable();

  useEffect(() => {
    if (
      Object.keys(params).length > 0 &&
      params?.electionScheduleId &&
      params?.electionTypeId
    ) {
      getCandidateNominationStatisticsData({
        electionTypeId: params?.electionTypeId,
        scheduleId: params?.electionScheduleId,
      });

      getCandidatePaymentTableData({
        electionTypeId: params?.electionTypeId,
        scheduleId: params?.electionScheduleId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitSearch = (data: any) => {
    getCandidateNominationStatisticsData({
      electionTypeId: data?.electionTypeId,
      scheduleId: data?.electionScheduleId,
    });

    getCandidatePaymentTableData({
      electionTypeId: data?.electionTypeId,
      scheduleId: data?.electionScheduleId,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t(
            'CANDIDATE_NOMINATION_STATISTICS.CANDIDATE_NOMINATION_STATISTICS',
          ),
        }}
        breadcrumbs={candidateNominationStatisticsBreadcrumbs(t)}
      />

      {userType === USER_TYPES.ADMIN && (
        <SearchComponents
          totalCol="grid-cols-lg-9"
          colSpan="col-span-4"
          struct={searchStruct}
          onSubmitHandler={onSubmitSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          ]}
          allSelectedData={allSelectedData}
        />
      )}

      <div className="mb-7">
        <Text size="md" weight="bold">
          {t('CANDIDATE_NOMINATION_STATISTICS.STATUS_TABLE')}
        </Text>
      </div>

      {/* স্ট্যাটাস বিবরণী */}
      <Table
        rows={candidateNominationStatisticsDetails || []}
        columns={candidateNominationStatisticsTableColumns({ params, t })}
        loading={loadingStatusTable}
        loadingItemCount={10}
      />

      <div className="mt-10 mb-7">
        <Text size="md" weight="bold">
          {t('CANDIDATE_NOMINATION_STATISTICS.PAYMENT_TABLE')}
        </Text>
      </div>

      {/* পেমেন্ট বিবরণী */}
      <Table
        rows={candidatePaymentTable || []}
        columns={paymentTableColumns({ params, t })}
        loading={loadingPaymentTable}
        loadingItemCount={10}
      />
    </div>
  );
};
