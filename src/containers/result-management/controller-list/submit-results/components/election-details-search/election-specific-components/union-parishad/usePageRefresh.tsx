import { getParams } from '@utils';
import { useContext, useEffect } from 'react';
import { FORM_FIELDS } from '@constants/forms';
import { useFormContext } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { getWardsForMembers } from './helper/get-wards-for-members';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { isUnionChairman, isUnionMember } from './helper/check-candidate-type';
import { getUnionOrWardsForMembers } from './helper/get-union-or-wards-for-members';
import { SubmitResultContext } from '@containers/result-management/controller-list/submit-results/context/submitResultContext';
import { getUnionOrWardsForChairman } from './helper/get-union-or-wards-for-chairman';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

type GetPollingCentersListSelect = (obj: {
  scheduleId: number;
  electionSettingsId: number;
  userId: string;
}) => void;

interface Props {
  setUnionOrWards: (x: any[]) => void;
  setWards: (x: any[]) => void;
  getPollingCentersListSelect: GetPollingCentersListSelect;
}

const usePageRefresh = ({
  setUnionOrWards,
  setWards,
  getPollingCentersListSelect,
}: Props) => {
  const { candidateTypeId, electionSettingsId } = useParams();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { watch, setValue } = useFormContext();

  const scheduleIdWatch = watch(SUBMIT_RESULTS.SCHEDULE);

  const {
    isAdmin,
    electionSettings,
    unionOrWards: unionOrWardsRedux,
    subject: userIdElectionUser,
  } = useFiltersRedux();

  const { setContextData } = useContext(SubmitResultContext)!;

  useEffect(() => {
    const areAllDependenciesAvailable =
      scheduleIdWatch &&
      candidateTypeId &&
      electionSettingsId &&
      electionSettings?.length &&
      unionOrWardsRedux?.length;

    if (!areAllDependenciesAvailable) return;

    const isChairmanElection = isUnionChairman(candidateTypeId);
    const isMemberElection = isUnionMember(candidateTypeId);

    setValue(SUBMIT_RESULTS.CANDIDATE_TYPE, Number(candidateTypeId));

    const selectedCandidateSettings = electionSettings?.find(
      (item) => item?.extra?.electionSettingsId === Number(electionSettingsId),
    );

    // console.log('-------------- electionSettings:', electionSettings);
    // console.log('selectedCandidateSettings:', selectedCandidateSettings);
    // console.log({ isChairmanElection, isMemberElection });
    // console.log({ candidateTypeId, electionSettingsId });

    setContextData((prev: any) => {
      return {
        ...prev,
        candidateType: Number(candidateTypeId),
        selectedCandidateSettings,

        ...(isChairmanElection
          ? {
              selectedUpUnionOrWardId: Number(electionSettingsId),
            }
          : {}),

        ...(isMemberElection
          ? {
              selectedUpUnionOrWardId:
                selectedCandidateSettings?.extra?.unionOrWardId,
              selectedUpWardId: Number(electionSettingsId),
            }
          : {}),
      };
    });

    if (isChairmanElection) {
      const chairmanSettings = getUnionOrWardsForChairman({
        electionSettings,
        candidateType: Number(candidateTypeId),
      });
      setUnionOrWards(chairmanSettings || []);
    } else if (isMemberElection) {
      const newUnions = getUnionOrWardsForMembers({
        electionSettings,
        unionOrWardsRedux,
        candidateType: Number(candidateTypeId),
      });

      setUnionOrWards(newUnions || []);

      const membersSettings = getWardsForMembers({
        candidateType: Number(candidateTypeId),
        unionOrWardId: Number(selectedCandidateSettings?.extra?.unionOrWardId),
        electionSettings,
      });

      setWards(membersSettings || []);
    }

    getPollingCentersListSelect({
      scheduleId: scheduleIdWatch as number,
      electionSettingsId: Number(electionSettingsId),
      userId: isAdmin ? params?.userId : (userIdElectionUser as string),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    scheduleIdWatch,
    candidateTypeId,
    electionSettingsId,
    electionSettings,
    unionOrWardsRedux,
    isAdmin,
    params?.userId,
    userIdElectionUser,
  ]);
};

export default usePageRefresh;
