import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Header, Table, Text } from '@pentabd/ui';

import {
  conditionalRequiredField,
  monitoringOverallResultsTableBreadcrumbs,
  resultObservationTableColumn,
} from './constants';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { USER_TYPES } from '@constants/user-types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useResultObservation } from '@hooks/result-management/monitoring-overall-results/useResultObservation';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { allSelectedData, searchStruct } from './searchConstants';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';
import { ELECTION_INFO } from '@constants/election-info';

function MonitoringOverallResults() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const {
    electionTypeId,
    electionScheduleId,
    zillaId,
    constituencyId,
    municipalityId,
    upazilaId,
    unionOrWardId,
  } = params;

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const tableName1 = '';
  const tableName2 = t(
    'MONITORING_OVERALL_RESULTS.ASSISTANT_RECRUTING_OFFICER',
  );
  const tableName3 = t('MONITORING_OVERALL_RESULTS.RETURNING_OFFICER');

  const {
    getResultObservation,
    loading,
    resultObservationSummary,
    aroResultObservationSummary,
    roResultObservationSummary,
    isFailed,
  } = useResultObservation();

  const handleSearch = (data: any) => {
    if (data?.electionScheduleId && data?.zillaId) {
      const {
        electionTypeId,
        electionScheduleId,
        zillaId,
        constituencyId,
        municipalityId,
        upazilaId,
        unionOrWardId,
      } = data;

      getResultObservation({
        electionTypeId,
        electionScheduleId,
        zillaId,
        constituencyId,
        municipalityId,
        upazilaId,
        unionOrWardId,
      });
    }
  };

  const showResultObservationSummary =
    resultObservationSummary && resultObservationSummary?.length > 0;

  const showAroResultObservationSummary =
    aroResultObservationSummary &&
    aroResultObservationSummary?.length > 0 &&
    Number(electionTypeId) !== ELECTION_INFO.UNION_PARISHAD.ID;

  const showRoResultObservationSummary =
    roResultObservationSummary && roResultObservationSummary?.length > 0;

  useEffect(() => {
    if (electionTypeId && electionScheduleId && zillaId) {
      getResultObservation({
        electionTypeId,
        electionScheduleId,
        zillaId,
        constituencyId,
        municipalityId,
        upazilaId,
        unionOrWardId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeId, electionScheduleId, zillaId, upazilaId, unionOrWardId]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('MONITORING_OVERALL_RESULTS.MONITORING_OVERALL_RESULTS'),
        }}
        breadcrumbs={monitoringOverallResultsTableBreadcrumbs(t)}
      />

      {userType === USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStruct}
          onSubmitHandler={handleSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.ZILLA_ID,
          ]}
          conditionalRequiredField={conditionalRequiredField}
          allSelectedData={allSelectedData}
        />
      ) : (
        <SearchComponents
          struct={searchStruct}
          onSubmitHandler={handleSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.ZILLA_ID,
          ]}
          conditionalRequiredField={conditionalRequiredField}
          allSelectedData={allSelectedData}
        />
      )}

      {showResultObservationSummary ? (
        <div className="mb-12">
          <Table
            isBorder
            loading={loading}
            loadingItemCount={3}
            isShowColumnHeader={false}
            columns={resultObservationTableColumn(t, tableName1)}
            rows={resultObservationSummary || []}
            tableType="primary"
          />
        </div>
      ) : null}

      {showAroResultObservationSummary ? (
        <div className="mb-12">
          <Table
            isBorder
            loading={loading}
            loadingItemCount={3}
            columns={resultObservationTableColumn(t, tableName2)}
            rows={aroResultObservationSummary || []}
            tableType="primary"
          />
        </div>
      ) : null}

      {showRoResultObservationSummary ? (
        <div className="mb-12">
          <Table
            isBorder
            loading={loading}
            loadingItemCount={3}
            columns={resultObservationTableColumn(t, tableName3)}
            rows={roResultObservationSummary || []}
            tableType="primary"
          />
        </div>
      ) : null}

      <div>
        {isFailed ? (
          <div className="d-flex justify-content-center">
            <Text>No data found</Text>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MonitoringOverallResults;
