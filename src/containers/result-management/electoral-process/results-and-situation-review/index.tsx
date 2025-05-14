import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Tab } from '@pentabd/ui';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useRoReportFilters from '@hooks/candidate-info-management/report/useRoReportFilters';

import { USER_TYPES } from '@constants/user-types';
import { conditionalRequiredField, searchStruct } from './searchConstants';
import { getTabData, resultAndSituationReviewBreadcrumbs } from './constants';
import {
  allSelectedData,
  searchStructElectionUser,
} from './searchConstantsElectionUsers';
import { ResultAndSituationAnalysisSearch } from './components/ResultAndSituationAnalysisSearch';

const ResultAndSituationReview = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { t } = useTranslation();
  const { roReportFilters } = useRoReportFilters();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const handleSearch = (data: any) => {
    const { electionScheduleId, candidateTypeId } = data || {};

    if (
      (userType === USER_TYPES.ADMIN &&
        electionScheduleId &&
        candidateTypeId) ||
      (userType !== USER_TYPES.ADMIN &&
        electionScheduleId &&
        roReportFilters?.candidateType?.[0]?.value)
    ) {
      setSearchParams({ ...data });
    }
  };

  const tabData = getTabData(t);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('RESULT_AND_SITUATION_REVIEW.RESULT_AND_SITUATION_REVIEW'),
        }}
        breadcrumbs={resultAndSituationReviewBreadcrumbs(t)}
      />

      <ResultAndSituationAnalysisSearch
        setSearchParams={setSearchParams}
        allSelectedDataForSearch={allSelectedData}
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        onSubmitSearch={handleSearch}
        conditionalRequiredField={conditionalRequiredField}
      />

      <Tab active={activeTab} setActiveTab={setActiveTab} compact>
        <Tab.Heads>
          {tabData.map(({ label }, i) => (
            <Tab.Item key={i} index={i} label={label} />
          ))}
        </Tab.Heads>
        <Tab.ContentWrapper>
          {tabData.map(({ component }, i) => (
            <Tab.Content key={i} index={i}>
              {component}
            </Tab.Content>
          ))}
        </Tab.ContentWrapper>
      </Tab>
    </div>
  );
};

export default ResultAndSituationReview;
