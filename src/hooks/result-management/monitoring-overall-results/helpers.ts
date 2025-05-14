import { ELECTION_INFO } from '@constants/election-info';
import { ResultObservationTypes } from '@type/result-management/result-monitoring/monitoring-overall-result-types';
import { TFunction } from 'i18next';

export function mapResultObservationSummary(
  t: TFunction<'translation', undefined>,
  data: ResultObservationTypes,
) {
  const totalSubmittedDescriptionArray =
    data?.totalSubmittedPollingCenterResultCount?.map((item) => {
      return item?.candidateTypeNameBn;
    });

  const totalSubmittedValueArray =
    data?.totalSubmittedPollingCenterResultCount?.map((item) => {
      return item?.count?.toString();
    });

  return [
    {
      id: 1,
      label: t('MONITORING_OVERALL_RESULTS.TOTAL_VOTE_CENTER'),
      description: '',
      value: data?.totalPollingCenterCount,
      className: 'bg-primary-semi-midlight',
    },
    {
      id: 2,
      label: t('MONITORING_OVERALL_RESULTS.REJECTED_CENTER_NUMBER'),
      description: '',
      value: data?.totalCancelledPollingCenterCount,
    },
    {
      idx: 3,
      label: t('MONITORING_OVERALL_RESULTS.PRESIDING_OFFICER'),
      description: totalSubmittedDescriptionArray,
      value: totalSubmittedValueArray,
    },
  ];
}

export function mapAROResultSummary(
  t: TFunction<'translation', undefined>,
  data: ResultObservationTypes,
) {
  const totalSubmittedDescriptionArray =
    data?.totalSubmittedPollingCenterResultCount?.map((item) => {
      return item?.candidateTypeNameBn;
    });
  const totalSubmittedValueArray =
    data?.totalSubmittedPollingCenterResultCount?.map((item) => {
      return item?.count?.toString();
    });

  const totalApprovedDescriptionArray =
    data?.totalApprovedPollingCenterResultCount?.map((item) => {
      return item?.candidateTypeNameBn;
    });
  const totalApprovedValueArray =
    data?.totalApprovedPollingCenterResultCount?.map((item) => {
      return item?.count?.toString();
    });

  const totalCreatedBartaDescriptionArray =
    data?.totalCreatedBartaSheetCount?.map((item) => {
      return item?.candidateTypeNameBn;
    });
  const totalCreatedBartaValueArray = data?.totalCreatedBartaSheetCount?.map(
    (item) => {
      return item?.count?.toString();
    },
  );

  return [
    {
      label: t('MONITORING_OVERALL_RESULTS.ACCEPTED_RESULTS'),
      description: totalSubmittedDescriptionArray,
      value: totalSubmittedValueArray,
    },
    {
      label: t('MONITORING_OVERALL_RESULTS.APPROVED_RESULTS'),
      description: totalApprovedDescriptionArray,
      value: totalApprovedValueArray,
    },
    {
      label: t('MONITORING_OVERALL_RESULTS.PREPARED_MESSAGE_SHEET'),
      description: totalCreatedBartaDescriptionArray,
      value: totalCreatedBartaValueArray,
    },
  ];
}

export function mapROResultSummary({
  t,
  data,
  electionTypeId,
}: {
  t: TFunction<'translation', undefined>;
  data: ResultObservationTypes;
  electionTypeId: number | undefined;
}) {
  const totalCreatedBartaDescriptionArray =
    data?.totalCreatedBartaSheetCount?.map((item) => {
      return item?.candidateTypeNameBn;
    });
  const totalCreatedBartaValueArray = data?.totalCreatedBartaSheetCount?.map(
    (item) => {
      return item?.count?.toString();
    },
  );

  const totalApprovedBartaDescriptionArray =
    data?.totalApprovedBartaSheetCount?.map((item) => {
      return item?.candidateTypeNameBn;
    });
  const totalApprovedBartaValueArray = data?.totalApprovedBartaSheetCount?.map(
    (item) => {
      return item?.count?.toString();
    },
  );

  const totalFinalizedBartaDescriptionArray =
    data?.totalFinalizedBartaSheetCount?.map((item) => {
      return item?.candidateTypeNameBn;
    });
  const totalFinalizedBartaValueArray =
    data?.totalFinalizedBartaSheetCount?.map((item) => {
      return item?.count?.toString();
    });

  const isUnionElection = electionTypeId === ELECTION_INFO.UNION_PARISHAD.ID;

  return [
    {
      label: isUnionElection
        ? t('MONITORING_OVERALL_RESULTS.RECEIVED_MESSAGE_SHEET_UNION_ELECTION')
        : t('MONITORING_OVERALL_RESULTS.RECEIVED_MESSAGE_SHEET'),
      description: totalCreatedBartaDescriptionArray,
      value: totalCreatedBartaValueArray,
    },
    {
      label: t('MONITORING_OVERALL_RESULTS.PUBLISHED_MESSAGE_SHEET'),
      description: totalApprovedBartaDescriptionArray,
      value: totalApprovedBartaValueArray,
    },
    {
      label: t('MONITORING_OVERALL_RESULTS.FINALIZED_MESSAGE_SHEET'),
      description: totalFinalizedBartaDescriptionArray,
      value: totalFinalizedBartaValueArray,
    },
  ];
}
