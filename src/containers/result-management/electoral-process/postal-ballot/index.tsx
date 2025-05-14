import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '@pentabd/ui';

import useRoReportFilters from '@hooks/candidate-info-management/report/useRoReportFilters';
import { useGetPostalBallotCenter } from '@hooks/result-management/electoral-process/postal-ballot/useGetPostalBallotCenter';

import { postalBallotBreadcrumbs } from './constants';
import { allSelectedData, searchStruct } from './searchConstants';
import PostalBallotCenterInfo from './components/PostalBallotCenterInfo';
import {
  allSelectedDataElectionUser,
  searchStructElectionUser,
} from './searchConstantsElectionUser';
import { PostalBallotSearch } from './components/PostalBallotSearch';

const PostalBallot = () => {
  const { t } = useTranslation();
  const { roReportFilters } = useRoReportFilters(true);
  const [showCenterInfo, setShowCenterInfo] = useState(false);

  const { postalBallotCenter, getPostalBallotCenter, loading } =
    useGetPostalBallotCenter();

  const handleOnSubmit = (data: any) => {
    if (data?.electionScheduleId && data?.electionSettingsId) {
      getPostalBallotCenter({
        scheduleId: data?.electionScheduleId,
        settingsId: data?.electionSettingsId,
      });
      setShowCenterInfo(true);
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-6 pt-10"
        headerText={{
          header: t('POSTAL_BALLOT.HEADER'),
        }}
        breadcrumbs={postalBallotBreadcrumbs(t)}
      />

      <PostalBallotSearch
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        allSelectedDataForSearch={allSelectedData}
        allSelectedDataElectionUser={allSelectedDataElectionUser}
        onSubmitSearch={handleOnSubmit}
      />

      <PostalBallotCenterInfo
        roReportFilters={roReportFilters}
        showCenterInfo={showCenterInfo}
        setShowCenterInfo={setShowCenterInfo}
        getPostalBallotCenter={getPostalBallotCenter}
        postalBallotCenter={postalBallotCenter}
        loading={loading}
      />
    </div>
  );
};

export default PostalBallot;
