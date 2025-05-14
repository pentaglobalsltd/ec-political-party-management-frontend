import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Header, Table } from '@pentabd/ui';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useDynamicReportListing from '@hooks/candidate-info-management/dynamic-report/useDynamicReportListing';
import useDynamicReportDeleteById from '@hooks/candidate-info-management/dynamic-report/useDynamicReportDeleteById';

import { CANDIDATE_MANAGEMENT } from '@constants/permissions/candidate-management';
import {
  HeaderAction,
  TableColumns,
  DynamicReportBreadcrumbs,
} from './constants';

const DynamicReport = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const canEdit = permissionsArray?.includes(
    CANDIDATE_MANAGEMENT.EDIT_DYNAMIC_REPORT,
  );

  const { dynamicReportListing, getDynamicReportListingData, isLoading } =
    useDynamicReportListing();

  const { isSuccess: isDeleteSuccess, deleteDynamicReportByIdData } =
    useDynamicReportDeleteById();

  useEffect(() => {
    getDynamicReportListingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isDeleteSuccess) {
      getDynamicReportListingData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        actions={HeaderAction({ t, navigate, canEdit })}
        breadcrumbs={DynamicReportBreadcrumbs(t)}
        headerText={{
          header: t('DYNAMIC_REPORT.DYNAMIC_REPORT'),
        }}
      />

      <Table
        rows={dynamicReportListing}
        columns={TableColumns({
          t,
          navigate,
          canEdit,
          deleteDynamicReportByIdData,
        })}
        loading={isLoading}
        loadingItemCount={4}
      />
    </div>
  );
};

export default DynamicReport;
