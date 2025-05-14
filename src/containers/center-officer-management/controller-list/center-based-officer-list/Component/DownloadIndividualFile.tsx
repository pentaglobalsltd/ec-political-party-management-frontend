import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Button, Text } from '@pentabd/ui';

import { useCenterWisePollingPersonnelPdf } from '@hooks/center-officer-management/controller-list/polling-personnel-letters/useCenterWisePollingPersonnelPdf';
import { getParams } from '@utils';
import { USER_TYPES } from '@constants/user-types';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { FieldErrors } from 'react-hook-form';
import { childFiltersArray } from '../constant';
import { ReportRoSearchFiltersTypeNew } from '@hooks/candidate-info-management/report/useRoReportFiltersNew';

function DownloadIndividualFile({
  id,
  childFilters,
  roReportFilters,
  errors,
  trigger,
}: {
  id: number;
  roReportFilters: ReportRoSearchFiltersTypeNew;
  childFilters?: CenterOfficerManagementSearchProps;
  trigger: any;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { electionSchedules: electionSchedulesRedux, zillas: zillasRedux } =
    roReportFilters;

  const { getCenterWisePollingPersonnelPdfData, downloadLoading } =
    useCenterWisePollingPersonnelPdf();

  const downloadIndividualFile = async () => {
    await trigger(childFiltersArray);
    if (Object.keys(errors)?.length === 0) {
      if (
        userType === USER_TYPES.ADMIN &&
        params?.electionScheduleId &&
        params?.zillaId &&
        id
      ) {
        getCenterWisePollingPersonnelPdfData({
          searchItems: {
            ...params,
            pollingCenterIds: id,
            trainingDateTime: childFilters?.trainingDateTime,
            trainingPlace: childFilters?.trainingPlace,
            goodsReceiptDateTime: childFilters?.goodsReceiptDateTime,
            goodsDistributionDateTime: childFilters?.goodsDistributionDateTime,
            name: childFilters?.name,
            designation: childFilters?.designation,
            trainingRoom: childFilters?.trainingRoom,
          },
        });
      } else if (
        userType !== USER_TYPES.ADMIN &&
        electionSchedulesRedux?.[0]?.value &&
        zillasRedux?.[0]?.value
      ) {
        getCenterWisePollingPersonnelPdfData({
          searchItems: {
            ...params,
            electionScheduleId: electionSchedulesRedux?.[0]?.value?.toString(),
            zillaId: zillasRedux?.[0]?.value?.toString(),
            pollingCenterIds: id,
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
    <div>
      <Button
        type="primary"
        fill="fill"
        size="xs"
        onClick={downloadIndividualFile}
        disabled={!params?.upazilaId}
        loading={downloadLoading}
      >
        <Text component="p" sizeType="fs" size="sm" weight="semibold">
          {t('CENTER_BASED_OFFICER_LIST.DOWNLOAD')}
        </Text>
      </Button>
    </div>
  );
}

export default DownloadIndividualFile;
