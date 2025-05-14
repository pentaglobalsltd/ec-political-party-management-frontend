import { useContext, useEffect } from 'react';
import { getParams } from '@utils';
import { useSearchParams } from 'react-router-dom';
import { resetFieldType, watchType } from './types';
import { SelectOptionArray } from '@type/selection-option-type';
import { useUpazilas } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillas';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWards';
import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import { useGetUnionsWardsSelect } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionsWardsSelect';
import { NewVoteCenterContext } from '../../context/NewVoteCenterContext';
import { ELECTION_INFO } from '@constants/election-info';

const { ADD_VOTE_CENTER } =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

interface Props {
  watch: watchType;
  requiredField?: string[];
  resetField: resetFieldType;
}

interface HookReturnType {
  upazilas: SelectOptionArray[];
  unionsOrWards: SelectOptionArray[];
  upWards: SelectOptionArray[];

  isSearchBtnDisable: boolean;
}

const useVoterAreaFields = ({
  watch,
  requiredField,
  resetField,
}: Props): HookReturnType => {
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { contextData, setContextData } = useContext(NewVoteCenterContext)!;

  const isUnionParishadElection =
    ELECTION_INFO.UNION_PARISHAD.ID ===
    contextData?.potentialPollingCenter?.electionTypeId;

  // =============================== watch
  const upazillaByConstituencyWatch = watch(ADD_VOTE_CENTER.UPAZILA);
  const unionWatch = watch(ADD_VOTE_CENTER.UNION);
  const upWardWatch = watch(ADD_VOTE_CENTER.UP_WARD);

  useEffect(() => {
    const shouldResetWard = !upWardWatch;

    if (isUnionParishadElection && shouldResetWard) {
      setContextData((prev) => {
        if (prev) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { upUnionWardId, ...rest } = prev;
          return {
            ...rest,
          };
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnionParishadElection, upWardWatch]);

  // =============================== search filters hooks
  const { upazilas, getUpazila, resetUpazilas } = useUpazilas();

  // a hook that gives union based on upazilla
  const { unionsOrWards, getUnionsOrWard, resetUnionsOrWards } =
    useUnionsOrWards();

  // ওয়ার্ড
  const { unionsWards: upWards, getUnionsWardsSelect: getUPWardsSelect } =
    useGetUnionsWardsSelect();

  function areRequiredKeysDefined(data: any, requiredField: string[]) {
    for (const key of requiredField) {
      // eslint-disable-next-line no-prototype-builtins
      if (!data.hasOwnProperty(key) || !data[key]) {
        return false;
      }
    }
    return true;
  }

  const isSearchBtnDisable = !!(
    requiredField && !areRequiredKeysDefined(watch(), requiredField)
  );

  // =============================== search filters useEffects

  //get upazilla
  useEffect(() => {
    const isParamPresent =
      params?.municipalityId || params?.constituencyId || params.upazilaId;

    if (isParamPresent) {
      const dynamicParam = {
        ...(params.municipalityId && { municipalityId: params.municipalityId }),
        ...(params.constituencyId && {
          constituencyIds: params.constituencyId,
        }),
        ...(params.upazilaId && {
          upazilaIds: params.upazilaId,
        }),
      };

      resetUpazilaFilter();
      resetUnionFilter();

      getUpazila({ ...dynamicParam });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.constituencyId, params?.municipalityId, params?.upazilaId]);

  // get unionOrWards
  useEffect(() => {
    const isParamPresent =
      params?.municipalityId || params?.constituencyId || params?.upazilaId;

    if (isParamPresent && upazillaByConstituencyWatch) {
      const dynamicParam = {
        ...(params.municipalityId && { municipalityId: params.municipalityId }),
        ...(params.constituencyId && { constituencyId: params.constituencyId }),
      };

      resetUnionFilter();

      getUnionsOrWard({
        upazilaId: upazillaByConstituencyWatch as any,
        ...dynamicParam,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params?.municipalityId,
    params?.constituencyId,
    upazillaByConstituencyWatch,
  ]);

  // get wards
  useEffect(() => {
    if (!isUnionParishadElection) return;

    const isUnionPresent = !!(Array.isArray(unionWatch)
      ? unionWatch?.length
      : unionWatch);

    if (isUnionPresent) {
      const unionArray = Array.isArray(unionWatch) ? unionWatch : [unionWatch];
      // console.log('call union/ward:', unionWatch);
      // console.log('unionArray:', unionArray.join(','));

      getUPWardsSelect({ unionIds: unionArray.join(',') });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionWatch, isUnionParishadElection]);

  // **********************************

  const resetUpazilaFilter = (fullReset = false) => {
    resetField(ADD_VOTE_CENTER.UPAZILA);
    if (fullReset) {
      resetUpazilas();
    }
  };

  const resetUnionFilter = (fullReset = false) => {
    resetField(ADD_VOTE_CENTER.UNION);
    if (fullReset) {
      resetUnionsOrWards();
    }
  };

  // **********************************

  return { upazilas, unionsOrWards, upWards, isSearchBtnDisable };
};

export default useVoterAreaFields;
