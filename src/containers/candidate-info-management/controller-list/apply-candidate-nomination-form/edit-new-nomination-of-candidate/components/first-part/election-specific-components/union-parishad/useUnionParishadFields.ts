import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { typeWatch } from '../types';
import { FORM_FIELDS } from '@constants/forms';
import { useUpazilas } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillas';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useUnionByUpazila } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionByUpazila';
import { FirstPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';
import { SelectOptionArray } from '@type/selection-option-type';
import { useGetUnionsWardsSelect } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionsWardsSelect';

interface Props {
  watch: typeWatch;
  zillaId: number | string;
  candidateNominationFormFirstPart: FirstPartType;
}

interface HookReturnType {
  upazilas: SelectOptionArray[];
  unionByUpazila: SelectOptionArray[];
  upWards: SelectOptionArray[];
  voterArea: SelectOptionArray[];

  watchUpazilasOrThanas: any;
  watchUnionOrWard: any;
}

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;

const useUnionParishadFields = ({
  watch,
  zillaId,
  candidateNominationFormFirstPart,
}: Props): HookReturnType => {
  const {
    // scheduleId: electionScheduleId,
    // candidateTypeId,
    electionTypeId,
  } = useParams();

  // watches =======================
  const watchUpazilasOrThanas = watch(`proposer.${PROPOSER.UPAZILA_ID}`);
  const watchUnionOrWard = watch(`proposer.${PROPOSER.UNION_OR_WARD_ID}`);

  // hooks =======================
  const { upazilas, getUpazila } = useUpazilas();
  const { unionByUpazila, getUnionByUpazila } = useUnionByUpazila();
  const { unionsWards: upWards, getUnionsWardsSelect: getUPWardsSelect } =
    useGetUnionsWardsSelect();
  const { voterArea, getVoterArea } = useVoterAreas();

  // get upazilas for mayor
  useEffect(() => {
    if (zillaId) {
      getUpazila({
        zillaId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeId, zillaId]);

  // get union
  useEffect(() => {
    if (watchUpazilasOrThanas) {
      getUnionByUpazila({
        upazilaId: watchUpazilasOrThanas as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchUpazilasOrThanas]);

  // get ইউনিয়ন পরিষদের ওয়ার্ড
  useEffect(() => {
    if (watchUnionOrWard) {
      getUPWardsSelect({
        unionId: Number(watchUnionOrWard),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchUnionOrWard]);

  // get voter area
  useEffect(() => {
    if (zillaId && watchUpazilasOrThanas && watchUnionOrWard) {
      getVoterArea(
        zillaId,
        watchUpazilasOrThanas as number,
        watchUnionOrWard as number,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId, watchUpazilasOrThanas, watchUnionOrWard]);

  // Edit
  useEffect(() => {
    if (candidateNominationFormFirstPart?.proposer) {
      const { zillaId, upazilaId, unionOrWardId } =
        candidateNominationFormFirstPart.proposer;

      // edit upazilas
      if (zillaId) {
        getUpazila({
          zillaId,
        });
      }

      // edit union-or-wards
      if (upazilaId) {
        getUnionByUpazila({ upazilaId });
      }

      // edit union-wards
      if (watchUnionOrWard) {
        getUPWardsSelect({
          unionId: Number(watchUnionOrWard),
        });
      }

      // edit voter area
      if (zillaId && upazilaId && unionOrWardId) {
        getVoterArea(zillaId, upazilaId, unionOrWardId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateNominationFormFirstPart?.proposer]);

  return {
    unionByUpazila,
    upazilas,
    upWards,
    voterArea,
    watchUpazilasOrThanas,
    watchUnionOrWard,
  };
};

export default useUnionParishadFields;
