import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { typeGetPotentialPollingInstituteCenterAreasData } from '@hooks/vote-center-management/center-management/polling-center/usePotentialPollingCentersPollingCenterService';
import { SetContextData } from '@containers/vote-center-management/center-management/vote-center-addition/new-vote-center/create-edit/context/NewVoteCenterContext';
import { getParams } from '@utils';
import usePotentialPollingCentersPollingCenterService from '@hooks/vote-center-management/center-management/polling-center/usePotentialPollingCentersPollingCenterService';
import useGetPollingCenterByIdPollingCenterService, {
  typeGetPollingCentersByIdData,
} from '@hooks/vote-center-management/center-management/polling-center/useGetPollingCenterByIdPollingCenterService';

interface Props {
  setContextData: SetContextData;
}

interface HookReturnType {
  getPotentialPollingInstituteCenterAreasData: typeGetPotentialPollingInstituteCenterAreasData;
  getPollingCentersByIdData: typeGetPollingCentersByIdData;
}

const useCreateEditCombinePollingCenterService = ({
  setContextData,
}: Props): HookReturnType => {
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
    usePotentialPollingCentersPollingCenterService({ setContextData });

  // GET while updating polling center ==================================
  const { getPollingCentersByIdData } =
    useGetPollingCenterByIdPollingCenterService({
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

export default useCreateEditCombinePollingCenterService;
