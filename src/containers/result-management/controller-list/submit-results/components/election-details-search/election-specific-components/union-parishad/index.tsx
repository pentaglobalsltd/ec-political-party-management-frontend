import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { OptionType } from '@pentabd/ui/build/atoms/select/types';
import { IconChevronDown } from '@pentabd/icons';
import { SelectOptionArray } from '@type/selection-option-type';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { getParams } from '@utils';
import { SubmitResultContext } from '../../../../context/submitResultContext';
import { FORM_FIELDS } from '@constants/forms';
import { usePollingCentersOpAroOpListSelect } from '@hooks/result-management/submit-results/usePollingCentersOpAroOp';
import Select from '@components/inputs/Select';
import { getUnionOrWardsForChairman } from './helper/get-union-or-wards-for-chairman';
import { getUnionOrWardsForMembers } from './helper/get-union-or-wards-for-members';
import { getWardsForMembers } from './helper/get-wards-for-members';
import { isUnionChairman, isUnionMember } from './helper/check-candidate-type';
import usePageRefresh from './usePageRefresh';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const UnionParishadElection = () => {
  const { t } = useTranslation();
  const [unionOrWards, setUnionOrWards] = useState<SelectOptionArray[]>([]);
  const [wards, setWards] = useState<SelectOptionArray[]>([]);

  const { contextData, setContextData, resetFileUrl, setFileUploadDisable } =
    useContext(SubmitResultContext)!;

  const {
    // pollingCenters,
    getPollingCentersListSelect,
    resetPollingCentersListSelect,
  } = usePollingCentersOpAroOpListSelect(setContextData);

  // when just landed onto the page or user refreshed the page
  usePageRefresh({ setUnionOrWards, setWards, getPollingCentersListSelect });

  const {
    isAdmin,
    electionSettings,
    candidateTypes,
    electionSchedules,
    unionOrWards: unionOrWardsRedux,
    subject: userIdElectionUser,
  } = useFiltersRedux();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { watch, setValue } = useFormContext();
  const scheduleIdWatch = watch(SUBMIT_RESULTS.SCHEDULE);

  const isChairmanElection = isUnionChairman(contextData?.candidateType);
  const isMemberElection = isUnionMember(contextData?.candidateType);

  const resetUploadPdf = () => {
    setFileUploadDisable(true);
    resetFileUrl();
  };

  const onSelectCandidateType = (candidateType: number) => {
    // for all candidates
    setContextData((prev: any) => {
      return {
        ...prev,
        candidateType: candidateType,
        contextPollingCenters: [],
        selectedCenterId: null,
        selectedCandidateSettings: {},
        contextResultByCandidates: {},

        selectedUpUnionOrWardId: null,
        selectedUpWardId: null,
      };
    });

    resetUploadPdf();

    resetPollingCentersListSelect();

    setValue(SUBMIT_RESULTS.POLLING_CENTERS, null);
    setValue(SUBMIT_RESULTS.UP_UNION_OR_WARD, null);
    setValue(SUBMIT_RESULTS.UP_WARD, null);
    setWards([]);

    const isCurrentCandidateChairman = isUnionChairman(candidateType);

    // only for chairman
    if (isCurrentCandidateChairman) {
      const chairmanSettings = getUnionOrWardsForChairman({
        electionSettings,
        candidateType,
      });
      setUnionOrWards(chairmanSettings || []);
    }

    // only for members
    else {
      const newUnions = getUnionOrWardsForMembers({
        electionSettings,
        unionOrWardsRedux,
        candidateType,
      });
      setUnionOrWards(newUnions || []);
    }
  };

  const onSelectUnionOrWards = (unionOrWardId: number) => {
    resetUploadPdf();

    setValue(SUBMIT_RESULTS.UP_WARD, null);
    setValue(SUBMIT_RESULTS.POLLING_CENTERS, null);

    if (isChairmanElection) {
      setContextData((prev: any) => {
        return {
          ...prev,
          selectedUnionWardId: undefined, // this property is used in other elections except union-parishad
          selectedUpUnionOrWardId: unionOrWardId, // this is used in union-parishad election only
          selectedUpWardId: null,
          selectedCandidateSettings: electionSettings?.find(
            (item) => item?.extra?.electionSettingsId === unionOrWardId,
          ),

          selectedCenterId: null,
          contextResultByCandidates: {},
        };
      });

      getPollingCentersListSelect({
        scheduleId: scheduleIdWatch as number,
        electionSettingsId: unionOrWardId,
        userId: isAdmin ? params?.userId : (userIdElectionUser as string),
      });
    } else if (isMemberElection) {
      setContextData((prev: any) => {
        return {
          ...prev,
          selectedUnionWardId: undefined, // this property is used in other elections except union-parishad
          selectedUpUnionOrWardId: unionOrWardId, // this is used in union-parishad election only
          selectedUpWardId: null,
          selectedCandidateSettings: {},

          contextPollingCenters: [],
          selectedCenterId: null,
          contextResultByCandidates: {},
        };
      });

      const membersSettings = getWardsForMembers({
        candidateType: contextData?.candidateType,
        unionOrWardId: Number(unionOrWardId),
        electionSettings,
      });

      setWards(membersSettings || []);
    }
  };

  const onSelectWard = (wardId: number) => {
    setContextData((prev: any) => {
      return {
        ...prev,
        selectedUpWardId: wardId, // this is used in union-parishad election only
        selectedCandidateSettings: electionSettings?.find(
          (item) => item?.extra?.electionSettingsId === wardId,
        ),

        selectedCenterId: null,
        contextResultByCandidates: {},
      };
    });

    getPollingCentersListSelect({
      scheduleId: scheduleIdWatch as number,
      electionSettingsId: wardId,
      userId: isAdmin ? params?.userId : (userIdElectionUser as string),
    });
  };

  return (
    <>
      <div className="col-span-lg-5">
        <Select
          title={t('SUBMIT_RESULTS.ELECTION_ONLY_TITLE')}
          name={SUBMIT_RESULTS.SCHEDULE}
          options={electionSchedules as OptionType[]}
          suffix={<IconChevronDown size="20" fill="subtitle2" />}
          disabled
        />
      </div>

      <div className="col-span-lg-5">
        <Select
          title={t('SUBMIT_RESULTS.FOR_POST')}
          name={SUBMIT_RESULTS.CANDIDATE_TYPE}
          options={candidateTypes as OptionType[]}
          suffix={<IconChevronDown size="20" fill="subtitle2" />}
          resetData={(data) => data && onSelectCandidateType(data as number)}
        />
      </div>

      <div className="col-span-lg-5">
        <Select
          title={t('SUBMIT_RESULTS.UNION_OR_WARD')}
          name={SUBMIT_RESULTS.UP_UNION_OR_WARD}
          options={unionOrWards}
          suffix={<IconChevronDown size="20" fill="subtitle2" />}
          resetData={(data) => data && onSelectUnionOrWards(Number(data))}
        />
      </div>

      {!isChairmanElection ? (
        <div className="col-span-lg-5">
          <Select
            title={t('SUBMIT_RESULTS.UNION_PARISHAD_WARD')}
            name={SUBMIT_RESULTS.UP_WARD}
            options={wards}
            suffix={<IconChevronDown size="20" fill="subtitle2" />}
            resetData={(data) => data && onSelectWard(data as number)}
          />
        </div>
      ) : null}
    </>
  );
};

export default UnionParishadElection;
