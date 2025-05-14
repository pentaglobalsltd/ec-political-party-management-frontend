import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@pentabd/ui';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { submitResultsSummaryTableBreadcrumbs } from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import SubmitResults from '@containers/result-management/controller-list/submit-results';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { allSelectedData, structSearch } from './searchConstants';
import { USER_PROFILE_LIST_TYPE } from '@containers/user-management/controller-list/constants';

const SubmitResultsSummary = () => {
  const { t } = useTranslation();

  const getSettingsId = true;
  const isOnMount = false;

  const { setFiltersInRedux } = useFiltersRedux();

  const {
    roReportFilters,
    getRoReportFiltersData,
    success: successRoReportFilter,
  } = useRoReportFiltersNew(getSettingsId, isOnMount);

  useEffect(() => {
    if (successRoReportFilter) {
      setFiltersInRedux(roReportFilters);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roReportFilters]);

  const onSubmitSearch = (data: any) => {
    getRoReportFiltersData(data.userId);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-6 pt-10"
        headerText={{
          header: t('SUBMIT_RESULTS.SUBMIT_RESULTS_SUMMARY'),
        }}
        breadcrumbs={submitResultsSummaryTableBreadcrumbs(t)}
      />

      {/* in here election settings id = constituencyId */}
      <SearchComponents
        totalCol="grid-cols-lg-8"
        colSpan="col-span-2"
        struct={structSearch}
        allSelectedData={allSelectedData}
        userType={USER_PROFILE_LIST_TYPE.ELECTION}
        requiredField={[
          SEARCH_FIELD_REQUIRED.USER_ID,
          SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
        ]}
        onSubmitHandler={onSubmitSearch}
        getElectionSettingsIdForAdmin={true}
      />

      {successRoReportFilter ? <SubmitResults /> : null}
    </div>
  );
};

export default SubmitResultsSummary;
