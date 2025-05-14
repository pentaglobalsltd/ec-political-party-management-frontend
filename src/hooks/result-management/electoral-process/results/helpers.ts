import { TFunction } from 'i18next';
import { SummaryResponse } from './useGetPollingCenterSummaryARO';
import { CENTER_STATUSES } from '@containers/result-management/electoral-process/results/constants';

export function mapPollingCenterSummary(
  t: TFunction<'translation', undefined>,
  data: SummaryResponse,
) {
  return [
    {
      id: 1,
      summaryLabel: t('RESULTS.TOTAL_CENTER'),
      summaryValue: data?.totalCenters,
    },
    {
      id: 2,
      summaryLabel: t('RESULTS.CANCELLATION_CENTER'),
      summaryValue: data?.cancelledCenters,
    },
    {
      id: 3,
      summaryLabel: t('RESULTS.TOTAL_VOTER'),
      summaryValue: data?.totalVoters,
    },
    {
      id: 4,
      summaryLabel: t('RESULTS.MALE_VOTER'),
      summaryValue: data?.totalMaleVoters,
    },
    {
      id: 5,
      summaryLabel: t('RESULTS.FEMALE_VOTER'),
      summaryValue: data?.totalFemaleVoters,
    },
    {
      id: 6,
      summaryLabel: t('RESULTS.THIRD_GENDER_VOTER'),
      summaryValue: data?.totalThirdGenderVoters,
    },
  ];
}

export function mapPollingCenterDescription(
  t: TFunction<'translation', undefined>,
  data: SummaryResponse,
) {
  let description = [
    {
      id: 1,
      descriptionLabel: t('RESULTS.TAB'),
      descriptionStatus: CENTER_STATUSES.OPERATOR_ENTERED,
    },
    {
      id: 2,
      descriptionLabel: t('RESULTS.COMPLETED_CENTER_NUMBER'),
      descriptionStatus: CENTER_STATUSES.COMPLETED_CENTERS,
    },
    {
      id: 3,
      descriptionLabel: t('RESULTS.INCOMPLETED_CENTER_NUMBER'),
      descriptionStatus: CENTER_STATUSES.INCOMPLETE_CENTERS,
    },
    {
      id: 4,
      descriptionLabel: t('RESULTS.WAITING_CENTER_NUMBER'),
      descriptionStatus: CENTER_STATUSES.PENDING_CENTERS,
    },
  ];

  const propertiesToMap = [
    { key: 'totalForwardedByOp' },
    { key: 'totalApproved' },
    {
      key: 'totalPendingForApproval',
    },
    { key: 'totalNotForwardedByOp' },
  ];

  let maxCount = 0;

  propertiesToMap.forEach((property: any, index: number) => {
    const dataArray = data[property.key];
    if (dataArray?.length > maxCount) {
      maxCount = dataArray?.length;
    }
  });

  propertiesToMap.forEach((property: any, index: number) => {
    const dataArray = data[property.key];

    Array.from(
      { length: maxCount },
      (_, idx) =>
        (description[index] = {
          ...description[index],
          [`descriptionValue${idx}`]: dataArray[idx]?.count,
        }),
    );
  });

  return description;
}

export function mapCandidateTypeName(data: SummaryResponse) {
  if (data?.totalForwardedByOp?.length > 0) {
    const candidateTypeArray = data?.totalForwardedByOp?.map((item: any) => {
      return {
        candidateTypeName: item?.candidateTypeNameBn,
        candidateTypeId: item?.candidateTypeId,
      };
    });
    return candidateTypeArray;
  } else if (data?.totalApproved?.length > 0) {
    const candidateTypeArray = data?.totalApproved?.map((item: any) => {
      return {
        candidateTypeName: item?.candidateTypeNameBn,
        candidateTypeId: item?.candidateTypeId,
      };
    });
    return candidateTypeArray;
  } else if (data?.totalPendingForApproval?.length > 0) {
    const candidateTypeArray = data?.totalPendingForApproval?.map(
      (item: any) => {
        return {
          candidateTypeName: item?.candidateTypeNameBn,
          candidateTypeId: item?.candidateTypeId,
        };
      },
    );
    return candidateTypeArray;
  } else if (data?.totalNotForwardedByOp?.length > 0) {
    const candidateTypeArray = data?.totalNotForwardedByOp?.map((item: any) => {
      return {
        candidateTypeName: item?.candidateTypeNameBn,
        candidateTypeId: item?.candidateTypeId,
      };
    });
    return candidateTypeArray;
  }
}
