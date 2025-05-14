import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import usePotentialPollingCenters, {
  typeGetPotentialPollingInstituteCenterAreasData,
} from '@hooks/vote-center-management/center-management/polling-center/usePotentialPollingCenters';
import useGetPollingCentersById, {
  typeGetPollingCentersByIdData,
} from '@hooks/vote-center-management/center-management/polling-center/useGetPollingCenterById';
import { SetContextData } from '@containers/vote-center-management/center-management/vote-center-addition/new-vote-center/create-edit/context/NewVoteCenterContext';
import { getParams } from '@utils';

interface Props {
  setContextData: SetContextData;
}

interface HookReturnType {
  getPotentialPollingInstituteCenterAreasData: typeGetPotentialPollingInstituteCenterAreasData;
  getPollingCentersByIdData: typeGetPollingCentersByIdData;
}

const useCreateEditCombine = ({ setContextData }: Props): HookReturnType => {
  const {
    electionSettingsId,
    unionOrWardId,
    pollingInstituteId,
    pollingCenterId,
  } = useParams();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { unionWardId } = params;

  // GET while creating polling center ==================================
  const { getPotentialPollingInstituteCenterAreasData } =
    usePotentialPollingCenters({ setContextData });

  // GET while updating polling center ==================================
  const { getPollingCentersByIdData } = useGetPollingCentersById({
    setContextData,
  });

  // initial CREATE
  useEffect(() => {
    if (electionSettingsId && unionOrWardId && pollingInstituteId) {
      getPotentialPollingInstituteCenterAreasData({
        electionSettingsId,
        unionOrWardId,
        queryParams: { pollingInstituteId, unionOrWardIds: unionOrWardId },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsId, unionOrWardId, pollingInstituteId]);

  // initial UPDATE
  useEffect(() => {
    if (electionSettingsId && unionOrWardId && pollingCenterId) {
      getPollingCentersByIdData({
        electionSettingsId,
        unionOrWardId,
        pollingCenterId,
        queryParams: {
          unionOrWardIds: unionOrWardId,
          ...(unionWardId ? { unionWardIds: unionWardId } : {}),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsId, unionOrWardId, pollingCenterId, unionWardId]);

  return {
    getPotentialPollingInstituteCenterAreasData,
    getPollingCentersByIdData,
  };
};

export default useCreateEditCombine;
