import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { typeWatch } from '../../../first-part/election-specific-components/types';
import { SecondPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/second-part';
import { useUpazilas } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillas';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useUnionByUpazila } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionByUpazila';
import { FORM_FIELDS } from '@constants/forms';
import { SelectOptionArray } from '@type/selection-option-type';
import { useGetUnionsWardsSelect } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionsWardsSelect';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

interface Props {
  watch: typeWatch;
  zillaId: string | number;
  candidateNominationFormSecondPart: SecondPartType;
}

interface HookReturnType {
  upazilas: SelectOptionArray[];
  unionByUpazila: SelectOptionArray[];
  upWards: SelectOptionArray[];
  voterArea: SelectOptionArray[];

  watchUpazilasOrThanas: any;
  watchUnionOrWard: any;
}

const useUnionParishadFields = ({
  watch,
  zillaId,
  candidateNominationFormSecondPart,
}: Props): HookReturnType => {
  const { electionTypeId } = useParams();

  // watch ================
  const watchUpazilasOrThanas = watch(`supporter.${SECOND_PART.UPAZILA_ID}`);
  const watchUnionOrWard = watch(`supporter.${SECOND_PART.UNION_OR_WARD_ID}`);

  // hooks ================
  const { upazilas, getUpazila } = useUpazilas();

  const { unionByUpazila, getUnionByUpazila } = useUnionByUpazila();

  const { unionsWards: upWards, getUnionsWardsSelect: getUPWardsSelect } =
    useGetUnionsWardsSelect();

  const { voterArea, getVoterArea } = useVoterAreas();

  // get upazilas thanas
  useEffect(() => {
    if (zillaId) {
      getUpazila({
        zillaId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId, electionTypeId]);

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
    if (candidateNominationFormSecondPart?.supporter) {
      const { zillaId, upazilaId, unionOrWardId } =
        candidateNominationFormSecondPart.supporter;

      // edit upazilas thanas
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
  }, [candidateNominationFormSecondPart?.supporter]);

  return {
    unionByUpazila,
    upazilas,
    upWards,
    voterArea,
    watchUnionOrWard,
    watchUpazilasOrThanas,
  };
};

export default useUnionParishadFields;
