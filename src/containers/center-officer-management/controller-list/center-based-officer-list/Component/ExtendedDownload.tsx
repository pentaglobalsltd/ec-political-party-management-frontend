import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Button, Text } from '@pentabd/ui';

import { USER_TYPES } from '@constants/user-types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { getParams } from '@utils';
import { useCenterWisePollingPersonnelPdf } from '@hooks/center-officer-management/controller-list/polling-personnel-letters/useCenterWisePollingPersonnelPdf';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { childFiltersArray } from '../constant';
import { FieldErrors } from 'react-hook-form';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';

function ExtendedDownload({
  childFilters,
  allPollingCenterIds,
  trigger,
  errors,
}: {
  childFilters?: CenterOfficerManagementSearchProps;
  allPollingCenterIds?: string;
  trigger: any;
  errors: FieldErrors;
}) {
  const [selectedRow, setSelectedRow] = useState<number | string | boolean>();

  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { roReportFilters } = useRoReportFiltersNew();
  const { electionSchedules: electionSchedulesRedux, zillas: zillasRedux } =
    roReportFilters;

  const {
    getCenterWisePollingPersonnelPdfData,
    downloadLoading,
    allDownloadLoading,
  } = useCenterWisePollingPersonnelPdf();

  const downloadFromThisPage = async () => {
    await trigger(childFiltersArray);
    if (Object?.keys(errors)?.length === 0) {
      if (
        params?.electionScheduleId &&
        params?.zillaId &&
        userType === USER_TYPES.ADMIN
      ) {
        setSelectedRow(false);
        getCenterWisePollingPersonnelPdfData({
          searchItems: {
            ...params,
            pollingCenterIds: allPollingCenterIds,
            trainingDateTime: childFilters?.trainingDateTime,
            trainingPlace: childFilters?.trainingPlace,
            goodsReceiptDateTime: childFilters?.goodsReceiptDateTime,
            goodsDistributionDateTime: childFilters?.goodsDistributionDateTime,
            name: childFilters?.name,
            designation: childFilters?.designation,
            trainingRoom: childFilters?.trainingRoom,
          },
        });
      } else if (userType !== USER_TYPES.ADMIN) {
        setSelectedRow(false);
        getCenterWisePollingPersonnelPdfData({
          searchItems: {
            ...params,
            electionScheduleId: electionSchedulesRedux?.[0]?.value?.toString(),
            zillaId: zillasRedux?.[0]?.value?.toString(),
            pollingCenterIds: allPollingCenterIds,
            trainingDateTime: childFilters?.trainingDateTime,
            trainingPlace: childFilters?.trainingPlace,
            goodsReceiptDateTime: childFilters?.goodsReceiptDateTime,
            goodsDistributionDateTime: childFilters?.goodsDistributionDateTime,
            name: childFilters?.name,
            designation: childFilters?.designation,
            trainingRoom: childFilters?.trainingRoom,
          },
        });
      }
    }
  };

  const downloadAll = async () => {
    await trigger(childFiltersArray);
    if (Object.keys(errors)?.length === 0) {
      if (
        params?.electionScheduleId &&
        params?.zillaId &&
        userType === USER_TYPES.ADMIN
      ) {
        setSelectedRow(false);
        getCenterWisePollingPersonnelPdfData({
          searchItems: {
            ...params,
            trainingDateTime: childFilters?.trainingDateTime,
            trainingPlace: childFilters?.trainingPlace,
            goodsReceiptDateTime: childFilters?.goodsReceiptDateTime,
            goodsDistributionDateTime: childFilters?.goodsDistributionDateTime,
            name: childFilters?.name,
            designation: childFilters?.designation,
            trainingRoom: childFilters?.trainingRoom,
          },
        });
      } else if (userType !== USER_TYPES.ADMIN) {
        setSelectedRow(false);
        getCenterWisePollingPersonnelPdfData({
          searchItems: {
            ...params,
            electionScheduleId: electionSchedulesRedux?.[0]?.value?.toString(),
            zillaId: zillasRedux?.[0]?.value?.toString(),
            trainingDateTime: childFilters?.trainingDateTime,
            trainingPlace: childFilters?.trainingPlace,
            goodsReceiptDateTime: childFilters?.goodsReceiptDateTime,
            goodsDistributionDateTime: childFilters?.goodsDistributionDateTime,
            name: childFilters?.name,
            designation: childFilters?.designation,
            trainingRoom: childFilters?.trainingRoom,
          },
        });
      }
    }
  };

  return (
    <div className="d-flex gap-5">
      <Button
        onClick={downloadFromThisPage}
        htmlType="button"
        size="xs"
        loading={!selectedRow ? downloadLoading : false}
        disabled={!params?.upazilaId}
      >
        <Text color="primary">
          {t('CENTER_BASED_OFFICER_LIST.DOWNLOAD_THIS_PAGE')}
        </Text>
      </Button>
      <Button
        onClick={downloadAll}
        htmlType="button"
        size="xs"
        loading={allDownloadLoading}
        disabled={!params?.upazilaId}
      >
        <Text color="primary">
          {t('CENTER_BASED_OFFICER_LIST.DOWNLOAD_ALL')}
        </Text>
      </Button>
    </div>
  );
}

export default ExtendedDownload;
