import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';

import { IconChevronDown } from '@pentabd/icons';

import Select from '@components/inputs/Select';
import { FORM_FIELDS } from '@constants/forms';
import CenterNumber from './CenterNumber';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { OptionType } from '@pentabd/ui/build/atoms/select/types';
import { SubmitResultContext } from '../../context/submitResultContext';
import ElectionSpecificComponents from './election-specific-components';
import { getParams } from '@utils';
import { GetPollingCenterResultSummaryForOp } from '@hooks/result-management/submit-results/usePollingCenterResultSummaryForOp';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

interface Props {
  getResultByCandidates: (obj: {
    scheduleId: number;
    candidateTypeId: number;
    centerId: number;
  }) => void;

  getPollingCenterResultSummaryForOp: (
    obj: GetPollingCenterResultSummaryForOp,
  ) => void;
}

const ElectionDetailsSearch = ({
  getResultByCandidates,
  getPollingCenterResultSummaryForOp,
}: Props) => {
  const { t } = useTranslation();

  const { pollingCenterId } = useParams();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { electionTypes, isAdmin } = useFiltersRedux();
  const electionTypeId = electionTypes?.[0]?.value;

  const { contextData, setContextData, resetFileUrl, setFileUploadDisable } =
    useContext(SubmitResultContext)!;

  const { watch, setValue } = useFormContext();

  const watchScheduleId = watch(SUBMIT_RESULTS.SCHEDULE);

  // fetching summary of the polling centers' statistic
  useEffect(() => {
    if (watchScheduleId && isAdmin) {
      getPollingCenterResultSummaryForOp({
        scheduleId: watchScheduleId,
        userId: params?.userId,
        /**
         * this 'userId' is for 'folafol-dakhil-sharangsho'
         * this 'userId' is the loginId of election user, selected by ADMIN
         */
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchScheduleId, params?.userId]);

  const getPollingCenterCountByCandidateType = () => {
    if (contextData?.candidateType) {
      const pollingCenterCountObject =
        contextData?.contextResultSummaryOp?.pollingCenterCount?.find(
          (item: any) => item?.candidateTypeId === contextData?.candidateType,
        );

      return pollingCenterCountObject?.pollingCenterCount || 0;
    } else return 0;
  };

  const onSelectPollingCenter = (data: any) => {
    // fetching summary of the voters' amount table
    if (watchScheduleId && contextData?.candidateType && data) {
      // setValue(SUBMIT_RESULTS.CANDIDATE_VOTE_DETAILS, null); // TODO

      setContextData((prev: any) => ({
        ...prev,
        selectedCenterId: data as number,
      }));

      setFileUploadDisable(false);
      resetFileUrl();

      getResultByCandidates({
        scheduleId: watchScheduleId,
        candidateTypeId: contextData?.candidateType,
        centerId: data as number,
      });
    }
  };

  useEffect(() => {
    /**
     * if path-params in URL has 'candidate-type' then we call 'get-polling-centers' api
     * then if 'get-polling-centers' api is success,
     * then we will have data in "contextPollingCenters" array.
     * as we also have 'pollingCenterId' in path-params,
     * then we set the polling-center-id in the 'filter'.
     *
     * we want to execute this block only 1 time (after the 1st rendering, and when we've all the necessary data),
     * to make this happen we're using "contextData.isSuccessResult"
     */
    if (
      contextData?.contextPollingCenters?.length &&
      pollingCenterId &&
      !contextData?.isSuccessResult
    ) {
      setValue(SUBMIT_RESULTS.POLLING_CENTERS, Number(pollingCenterId));
      onSelectPollingCenter(Number(pollingCenterId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData?.contextPollingCenters, pollingCenterId]);

  return (
    <>
      {/* 1 => নির্বাচন || পদের জন্য || election settings */}
      <div className="my-5 d-grid grid-cols-lg-10 gap-6">
        {/* নির্বাচন */}
        {/* national  ->  নির্বাচনী আসন +  পদের জন্য*/}
        {/* city corp -> পদের জন্য +  ওয়ার্ড নাম্বার*/}
        <ElectionSpecificComponents electionTypeId={electionTypeId} />
      </div>

      {/* 2 => মোট কেন্দ্রের সংখ্যা || দাখিলকৃত কেন্দ্রের সংখ্যা */}
      <div className="d-grid grid-cols-2 gap-6">
        {/* মোট কেন্দ্রের সংখ্যা */}
        <CenterNumber
          label="SUBMIT_RESULTS.TOTAL_CENTER_NUMBER"
          count={contextData?.contextResultSummaryOp?.totalPollingCenterCount}
        />

        {/* দাখিলকৃত কেন্দ্রের সংখ্যা */}
        <CenterNumber
          label="SUBMIT_RESULTS.SUBMITTED_CENTER_NO"
          count={getPollingCenterCountByCandidateType()}
        />
      </div>

      {/* 3 => ভোটকেন্দ্রের নাম ও নম্বর */}
      <div className="my-5">
        <Select
          title={t('SUBMIT_RESULTS.VOTE_CENTER_NAME_NO')}
          name={SUBMIT_RESULTS.POLLING_CENTERS}
          options={contextData?.contextPollingCenters || []}
          suffix={<IconChevronDown size="20" fill="subtitle2" />}
          isSearchable
          dropdownHeightType="lg"
          resetData={(data) => onSelectPollingCenter(data)}
          isTextEllipsis
        />
      </div>
    </>
  );
};

export default ElectionDetailsSearch;
