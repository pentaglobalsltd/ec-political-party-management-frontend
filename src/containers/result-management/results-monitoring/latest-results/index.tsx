import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@pentabd/ui';
import Loader from '@components/Loader';
import { SearchComponents } from '@components/application-search/SearchComponents';
import useLatestResults from '@hooks/result-management/result-monitoring/latest-results/useLatestResults';
import useCandidateTypes from '@hooks/miscellaneous/master-hook/candidate-type/useCandidateType';
import { getParams } from '@utils';
import {
  searchRequiredFields,
  allSelectedData,
} from './constants/search-constants';
import { ElectionSpecificSearch } from './helpers';
import CandidateTypeCheckbox from './components/CandidateTypeCheckbox';
import CarousalTable from './components/carousal-table';
import useEscKeyPress from './hooks/useEscKeyPress';
import useTimerPageRefresh from './useTimerPageRefresh';

interface SearchProps {
  page?: string;
  electionTypeId?: string;
  electionScheduleId?: string;
  zillaId?: string;
  constituencyId?: string;
}

const LatestResults = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [isActiveFullScreen, setIsActiveFullScreen] = useState(false);
  const [searchWatch, setSearchWatch] = useState();

  const { electionCandidateTypes, getElectionCandidateTypesData } =
    useCandidateTypes();

  const { isLoading, latestResults, getLatestResultsData } = useLatestResults();

  // exiting fullscreen with escape key
  useEscKeyPress({ setIsActiveFullScreen });

  // page refresh when timer runs out
  useTimerPageRefresh({ params, getLatestResultsData });

  const onSubmitSearch = (data: SearchProps) => {
    setIsActiveFullScreen(false);

    const { electionTypeId, electionScheduleId, constituencyId } = data;
    if (electionTypeId) getElectionCandidateTypesData(electionTypeId);

    if (electionScheduleId && constituencyId) {
      getLatestResultsData({
        electionScheduleId,
        electionSettingsId: constituencyId,
      });
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{
          header: t('LATEST_RESULTS_OBTAINED.LATEST_RESULTS_OBTAINED'),
        }}
      />

      <SearchComponents
        struct={ElectionSpecificSearch(searchWatch)}
        onSubmitHandler={onSubmitSearch}
        requiredField={searchRequiredFields}
        allSelectedData={allSelectedData}
        customClass="bg-primary-lighter"
        isGetWatch
        handleSearchWatch={(data) => setSearchWatch(data)}
      />

      {isLoading ? <Loader position="align-items-start" /> : null}

      {/* প্রার্থীর ধরণ */}
      <CandidateTypeCheckbox
        electionCandidateTypes={electionCandidateTypes}
        params={params}
        setSearchParams={setSearchParams}
        getLatestResultsData={getLatestResultsData}
        isLoading={isLoading}
      />

      {/* Carousal Table */}
      <CarousalTable
        latestResults={latestResults}
        isActiveFullScreen={isActiveFullScreen}
        isLoading={isLoading}
        setIsActiveFullScreen={setIsActiveFullScreen}
      />
    </div>
  );
};

export default LatestResults;
